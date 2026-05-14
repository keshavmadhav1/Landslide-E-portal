// ============================================================
//  LANDSLIDE E-PORTAL — Report Page JavaScript
// ============================================================

/* ── RAIN ANIMATION ──────────────────────────────────────── */
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

let drops = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initDrops() {
  drops = [];
  const count = Math.floor(canvas.width / 6);
  for (let i = 0; i < count; i++) {
    drops.push({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      length: Math.random() * 22 + 10,
      speed:  Math.random() * 4  + 3,
      opacity: Math.random() * 0.4 + 0.1,
      width:  Math.random() * 0.8 + 0.3,
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach(d => {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - d.length * 0.2, d.y + d.length);
    ctx.strokeStyle = `rgba(180, 220, 240, ${d.opacity})`;
    ctx.lineWidth   = d.width;
    ctx.stroke();
    d.y += d.speed;
    d.x -= d.speed * 0.2;
    if (d.y > canvas.height) {
      d.y = -d.length;
      d.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawRain);
}

window.addEventListener('resize', () => { resizeCanvas(); initDrops(); });
resizeCanvas();
initDrops();
drawRain();


/* ── AUTO-DETECT LOCATION ───────────────────────────────── */
const detectBtn = document.getElementById('detectLocation');

detectBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser.', 'error');
    return;
  }
  detectBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Detecting...';
  detectBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById('latitude').value  = pos.coords.latitude.toFixed(5);
      document.getElementById('longitude').value = pos.coords.longitude.toFixed(5);
      detectBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i> Auto-detect My Location';
      detectBtn.disabled = false;
      showToast('Location detected successfully!', 'success');
    },
    () => {
      detectBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i> Auto-detect My Location';
      detectBtn.disabled = false;
      showToast('Could not retrieve location. Please enter manually.', 'error');
    }
  );
});


/* ── PHOTO UPLOAD & PREVIEW ─────────────────────────────── */
const uploadZone    = document.getElementById('uploadZone');
const uploadContent = document.getElementById('uploadContent');
const fileInput     = document.getElementById('photos');
const previewGrid   = document.getElementById('previewGrid');
let   selectedFiles = [];

uploadZone.addEventListener('click', (e) => {
  if (!e.target.classList.contains('remove-img')) fileInput.click();
});

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  handleFiles([...e.dataTransfer.files]);
});

fileInput.addEventListener('change', () => handleFiles([...fileInput.files]));

function handleFiles(files) {
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { showToast(`${file.name} exceeds 5MB limit.`, 'error'); return; }
    selectedFiles.push(file);
    renderPreview(file, selectedFiles.length - 1);
  });
  uploadContent.style.display = selectedFiles.length ? 'none' : 'block';
}

function renderPreview(file, index) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const item = document.createElement('div');
    item.className = 'preview-item';
    item.dataset.index = index;
    item.innerHTML = `
      <img src="${e.target.result}" alt="preview" />
      <button class="remove-img" title="Remove"><i class="fa-solid fa-xmark"></i></button>
    `;
    item.querySelector('.remove-img').addEventListener('click', () => {
      selectedFiles[index] = null;
      item.remove();
      if (!previewGrid.children.length) uploadContent.style.display = 'block';
    });
    previewGrid.appendChild(item);
  };
  reader.readAsDataURL(file);
}


/* ── FORM VALIDATION ────────────────────────────────────── */
function validateField(el) {
  const isEmpty = el.value.trim() === '' || (el.tagName === 'SELECT' && el.value === '');
  el.classList.toggle('invalid', isEmpty && el.required);
  return !(isEmpty && el.required);
}

function validateSeverity() {
  return document.querySelector('input[name="severity"]:checked') !== null;
}

function clearValidation(el) {
  el.classList.remove('invalid');
}

document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => clearValidation(el));
  el.addEventListener('change', () => clearValidation(el));
});


/* ── FORM SUBMISSION ────────────────────────────────────── */
const form      = document.getElementById('reportForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate required fields
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;
  requiredFields.forEach(el => { if (!validateField(el)) valid = false; });
  if (!validateSeverity()) {
    showToast('Please select a severity level.', 'error');
    valid = false;
  }
  if (!valid) { showToast('Please fill in all required fields.', 'error'); return; }

  // Build FormData
  const formData = new FormData(form);
  const cleanFiles = selectedFiles.filter(Boolean);
  // Remove auto-added file input, re-add cleaned files
  formData.delete('photos');
  cleanFiles.forEach((f, i) => formData.append('photos', f, f.name));

  // Set loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/api/report', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok && data.success) {
      document.getElementById('reportIdDisplay').textContent = data.reportId || 'LS-' + Date.now();
      document.getElementById('successOverlay').classList.add('visible');
    } else {
      showToast(data.message || 'Submission failed. Please try again.', 'error');
    }
  } catch (err) {
    console.error(err);
    showToast('Could not connect to server. Make sure server.js is running.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});


/* ── RESET FORM ─────────────────────────────────────────── */
document.getElementById('resetBtn').addEventListener('click', () => {
  form.reset();
  selectedFiles = [];
  previewGrid.innerHTML = '';
  uploadContent.style.display = 'block';
  document.getElementById('successOverlay').classList.remove('visible');
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── TOAST NOTIFICATION ─────────────────────────────────── */
function showToast(message, type = 'info') {
  // Remove existing toast
  document.querySelectorAll('.toast-msg').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: ${type === 'error' ? '#ff4d4d' : type === 'success' ? '#3ecfda' : '#1a2f44'};
    color: ${type === 'success' ? '#0a1a22' : '#fff'};
    padding: 12px 26px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    max-width: 90vw;
    text-align: center;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}