// ============================================================
//  LANDSLIDE E-PORTAL — Backend Server (server.js)
//  Run with:  node server.js
//  Requires:  npm install express multer cors uuid
// ============================================================

const express  = require('express');
const multer   = require('multer');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = 3000;

// ── MIDDLEWARE ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── STORAGE SETUP ────────────────────────────────────────────
const uploadDir   = path.join(__dirname, 'uploads');
const reportsFile = path.join(__dirname, 'reports.json');

// Create directories/files if they don't exist
if (!fs.existsSync(uploadDir))   fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(reportsFile)) fs.writeFileSync(reportsFile, '[]', 'utf-8');

// Multer: save photos to /uploads with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only image files are allowed.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
});

// ── HELPERS ──────────────────────────────────────────────────
function readReports() {
  try {
    return JSON.parse(fs.readFileSync(reportsFile, 'utf-8'));
  } catch { return []; }
}

function saveReports(reports) {
  fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2), 'utf-8');
}

function generateReportId() {
  const ts   = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `LS-${ts}-${rand}`;
}

// ── ROUTES ──────────────────────────────────────────────────

// POST /api/report — Submit a new incident report
app.post('/api/report', upload.array('photos', 10), (req, res) => {
  try {
    const {
      fullName, contact, state, district, address,
      latitude, longitude, incidentDate, incidentTime,
      incidentType, severity, casualties, infrastructure, description,
    } = req.body;

    // Basic server-side validation
    const required = { fullName, contact, state, district, incidentDate, incidentType, severity, description };
    const missing  = Object.entries(required).filter(([, v]) => !v || v.trim() === '').map(([k]) => k);
    if (missing.length) {
      return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
    }

    // Build report object
    const reportId = generateReportId();
    const photos   = (req.files || []).map(f => `/uploads/${f.filename}`);

    const report = {
      reportId,
      submittedAt: new Date().toISOString(),
      reporter: { fullName: fullName.trim(), contact: contact.trim() },
      location: {
        state:     state.trim(),
        district:  district.trim(),
        address:   address ? address.trim() : '',
        latitude:  latitude  ? parseFloat(latitude)  : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
      incident: {
        date:           incidentDate,
        time:           incidentTime || '',
        type:           incidentType,
        severity,
        casualties:     casualties ? parseInt(casualties) : 0,
        infrastructure: infrastructure || 'None',
        description:    description.trim(),
      },
      photos,
      status: 'Received',  // Received | Under Review | Resolved
    };

    // Save to reports.json
    const reports = readReports();
    reports.push(report);
    saveReports(reports);

    console.log(`\n✅ New Report Submitted`);
    console.log(`   ID       : ${reportId}`);
    console.log(`   Reporter : ${fullName}`);
    console.log(`   Location : ${district}, ${state}`);
    console.log(`   Severity : ${severity}`);
    console.log(`   Photos   : ${photos.length}`);
    console.log(`   Time     : ${report.submittedAt}\n`);

    return res.status(201).json({
      success:  true,
      message:  'Report submitted successfully.',
      reportId,
    });

  } catch (err) {
    console.error('Error processing report:', err);
    return res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
  }
});

// GET /api/reports — Retrieve all reports (for admin/dashboard use)
app.get('/api/reports', (req, res) => {
  const reports = readReports();
  const { severity, state, status } = req.query;

  let filtered = reports;
  if (severity) filtered = filtered.filter(r => r.incident.severity === severity);
  if (state)    filtered = filtered.filter(r => r.location.state === state);
  if (status)   filtered = filtered.filter(r => r.status === status);

  res.json({
    success: true,
    count:   filtered.length,
    reports: filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
  });
});

// GET /api/reports/:id — Get a single report by ID
app.get('/api/reports/:id', (req, res) => {
  const reports = readReports();
  const report  = reports.find(r => r.reportId === req.params.id);
  if (!report) return res.status(404).json({ success: false, message: 'Report not found.' });
  res.json({ success: true, report });
});

// PATCH /api/reports/:id/status — Update report status
app.patch('/api/reports/:id/status', (req, res) => {
  const { status } = req.body;
  const allowed    = ['Received', 'Under Review', 'Resolved'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value.' });
  }
  const reports = readReports();
  const idx     = reports.findIndex(r => r.reportId === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Report not found.' });

  reports[idx].status = status;
  saveReports(reports);
  res.json({ success: true, message: `Status updated to "${status}".` });
});

// ── MULTER ERROR HANDLING ────────────────────────────────────
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Max size is 5MB per image.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) return res.status(400).json({ success: false, message: err.message });
  next();
});

// ── START SERVER ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌏 Landslide E-Portal Server running at http://localhost:${PORT}`);
  console.log(`   POST  /api/report          → Submit report`);
  console.log(`   GET   /api/reports         → List all reports`);
  console.log(`   GET   /api/reports/:id     → Get single report`);
  console.log(`   PATCH /api/reports/:id/status → Update status\n`);
});