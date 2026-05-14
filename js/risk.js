
const HISTORICAL_INCIDENTS = [
  
  { id:1,  lat:30.733,  lng:79.066,  location:"Chamoli",           state:"Uttarakhand", date:"2021-02-07", severity:"critical", deaths:204, cause:"Glacier burst",      desc:"Rishiganga & Dhauliganga dam breach" },
  { id:2,  lat:32.091,  lng:77.102,  location:"Kinnaur",           state:"Himachal Pradesh", date:"2021-08-11", severity:"critical", deaths:9,   cause:"Heavy rainfall",    desc:"Multiple vehicles swept on NH-5" },
  { id:3,  lat:30.066,  lng:78.300,  location:"Tehri",             state:"Uttarakhand", date:"2022-07-15", severity:"high",     deaths:3,   cause:"Heavy rainfall",    desc:"Debris flow blocked SH-1" },
  { id:4,  lat:9.931,   lng:76.580,  location:"Rajamala",          state:"Kerala",      date:"2020-08-07", severity:"critical", deaths:43,  cause:"Heavy rainfall",    desc:"Munnar-Rajamala road completely destroyed" },
  { id:5,  lat:11.869,  lng:75.359,  location:"Kalpetta",          state:"Kerala",      date:"2019-08-09", severity:"high",     deaths:17,  cause:"Heavy rainfall",    desc:"Wayanad district multiple slides" },
  { id:6,  lat:27.336,  lng:88.350,  location:"Sikkim",            state:"Sikkim",      date:"2023-10-04", severity:"critical", deaths:150, cause:"GLOF",             desc:"South Lhonak glacier lake outburst flood" },
  { id:7,  lat:32.760,  lng:74.857,  location:"Ramban",            state:"J&K",         date:"2023-07-08", severity:"high",     deaths:5,   cause:"Heavy rainfall",    desc:"NH-44 blocked for 3 days" },
  { id:8,  lat:27.033,  lng:92.666,  location:"Lumla",             state:"Arunachal Pradesh", date:"2022-06-14", severity:"moderate", deaths:1, cause:"Heavy rainfall", desc:"Eastern Arunachal Pradesh highway blocked" },
  { id:9,  lat:25.567,  lng:91.883,  location:"Cherrapunji",       state:"Meghalaya",   date:"2022-08-20", severity:"high",     deaths:7,   cause:"Extreme rainfall",  desc:"East Khasi Hills vulnerable zone" },
  { id:10, lat:26.209,  lng:92.933,  location:"Dispur",            state:"Assam",       date:"2022-06-17", severity:"moderate", deaths:0,   cause:"Heavy rainfall",    desc:"Guwahati periurban slopes affected" },
  { id:11, lat:31.104,  lng:77.173,  location:"Shimla",            state:"Himachal Pradesh", date:"2023-08-14", severity:"critical", deaths:22, cause:"Cloudburst",     desc:"Multiple collapses in Shimla town" },
  { id:12, lat:30.585,  lng:78.096,  location:"Uttarkashi",        state:"Uttarakhand", date:"2023-08-11", severity:"high",     deaths:14,  cause:"Cloudburst",       desc:"Yamunotri highway cut off" },
  { id:13, lat:12.295,  lng:75.783,  location:"Kodagu",            state:"Karnataka",   date:"2018-08-15", severity:"critical", deaths:14,  cause:"Heavy rainfall",    desc:"Coorg severely affected, 200+ displaced" },
  { id:14, lat:8.893,   lng:77.553,  location:"Tirunelveli",       state:"Tamil Nadu",  date:"2021-11-19", severity:"moderate", deaths:2,   cause:"Heavy rainfall",    desc:"Western Ghats foothills" },
  { id:15, lat:20.450,  lng:85.083,  location:"Koraput",           state:"Odisha",      date:"2021-09-23", severity:"low",      deaths:1,   cause:"Heavy rainfall",    desc:"Eastern Ghats fragile slopes" },
  { id:16, lat:27.533,  lng:88.612,  location:"Darjeeling",        state:"West Bengal", date:"2023-06-14", severity:"high",     deaths:4,   cause:"Heavy rainfall",    desc:"Kalimpong-Siliguri road blocked" },
  { id:17, lat:31.784,  lng:76.999,  location:"Mandi",             state:"Himachal Pradesh", date:"2023-07-24", severity:"critical", deaths:11, cause:"Flash flood",    desc:"Beas River valley multiple slides" },
  { id:18, lat:30.316,  lng:78.031,  location:"Pauri Garhwal",     state:"Uttarakhand", date:"2022-08-18", severity:"moderate", deaths:2,   cause:"Heavy rainfall",    desc:"Rural connectivity disrupted" },
  { id:19, lat:11.416,  lng:76.100,  location:"Ooty",              state:"Tamil Nadu",  date:"2022-08-06", severity:"moderate", deaths:0,   cause:"Heavy rainfall",    desc:"Nilgiri hills ghat roads blocked" },
  { id:20, lat:9.258,   lng:76.783,  location:"Pathanamthitta",    state:"Kerala",      date:"2021-10-17", severity:"high",     deaths:5,   cause:"Heavy rainfall",    desc:"Pampa river basin slope failures" },
  
  { id:21, lat:30.150,  lng:78.300,  location:"Devprayag",         state:"Uttarakhand", date:"2024-08-01", severity:"critical", deaths:null, cause:"Active slide",    desc:"NH-58 closed — rescue ops ongoing", live:true },
  { id:22, lat:32.200,  lng:77.050,  location:"Kullu",             state:"Himachal Pradesh", date:"2024-07-30", severity:"high", deaths:null, cause:"Cloudburst",   desc:"3 villages cut off", live:true },
  { id:23, lat:27.340,  lng:88.600,  location:"Kalimpong",         state:"West Bengal", date:"2024-07-29", severity:"moderate", deaths:null, cause:"Heavy rainfall", desc:"Highway NH-10 blockade", live:true },
];


const STATE_RISK = {
  "uttarakhand":       { score: 92, level: "critical", incidents: 318, avgAnnual: 45 },
  "himachal pradesh":  { score: 88, level: "critical", incidents: 271, avgAnnual: 39 },
  "sikkim":            { score: 85, level: "critical", incidents: 198, avgAnnual: 28 },
  "meghalaya":         { score: 80, level: "high",     incidents: 156, avgAnnual: 22 },
  "arunachal pradesh": { score: 78, level: "high",     incidents: 143, avgAnnual: 20 },
  "kerala":            { score: 76, level: "high",     incidents: 211, avgAnnual: 30 },
  "jammu and kashmir": { score: 74, level: "high",     incidents: 184, avgAnnual: 26 },
  "west bengal":       { score: 65, level: "moderate", incidents: 122, avgAnnual: 18 },
  "assam":             { score: 62, level: "moderate", incidents: 99,  avgAnnual: 14 },
  "manipur":           { score: 60, level: "moderate", incidents: 87,  avgAnnual: 12 },
  "nagaland":          { score: 58, level: "moderate", incidents: 74,  avgAnnual: 11 },
  "karnataka":         { score: 55, level: "moderate", incidents: 148, avgAnnual: 21 },
  "tamil nadu":        { score: 48, level: "moderate", incidents: 96,  avgAnnual: 14 },
  "mizoram":           { score: 70, level: "high",     incidents: 113, avgAnnual: 16 },
  "tripura":           { score: 52, level: "moderate", incidents: 68,  avgAnnual: 10 },
  "odisha":            { score: 42, level: "low",      incidents: 54,  avgAnnual: 8  },
  "andhra pradesh":    { score: 38, level: "low",      incidents: 47,  avgAnnual: 7  },
  "maharashtra":       { score: 50, level: "moderate", incidents: 113, avgAnnual: 16 },
  "goa":               { score: 35, level: "low",      incidents: 22,  avgAnnual: 3  },
  "rajasthan":         { score: 10, level: "safe",     incidents: 4,   avgAnnual: 1  },
  "gujarat":           { score: 12, level: "safe",     incidents: 6,   avgAnnual: 1  },
  "madhya pradesh":    { score: 20, level: "low",      incidents: 18,  avgAnnual: 3  },
  "uttar pradesh":     { score: 15, level: "low",      incidents: 12,  avgAnnual: 2  },
  "bihar":             { score: 12, level: "safe",     incidents: 8,   avgAnnual: 1  },
  "jharkhand":         { score: 28, level: "low",      incidents: 29,  avgAnnual: 4  },
  "chhattisgarh":      { score: 22, level: "low",      incidents: 16,  avgAnnual: 2  },
  "punjab":            { score: 8,  level: "safe",     incidents: 3,   avgAnnual: 0  },
  "haryana":           { score: 6,  level: "safe",     incidents: 2,   avgAnnual: 0  },
  "delhi":             { score: 5,  level: "safe",     incidents: 1,   avgAnnual: 0  },
};

const RISK_COLORS = {
  critical: { fill: "#ff3333", line: "#ff0000" },
  high:     { fill: "#ff8800", line: "#cc6600" },
  moderate: { fill: "#ffcc00", line: "#cc9900" },
  low:      { fill: "#00cc66", line: "#009944" },
  safe:     { fill: "#4488aa", line: "#336688" },
};

const RISK_SCORE_COLORS = {
  critical: "#ff3333",
  high:     "#ff8800",
  moderate: "#ffcc00",
  low:      "#00cc66",
  safe:     "#4488aa",
};


const INDIA_CENTER = [22.5, 80.0];
const INDIA_ZOOM   = 5;

const map = L.map("map", {
  center: INDIA_CENTER,
  zoom: INDIA_ZOOM,
  zoomControl: true,
  attributionControl: true,
  minZoom: 4,
  maxZoom: 16,
});


const osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "© OpenStreetMap contributors", maxZoom: 19 }
).addTo(map);

const satLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "© Esri", maxZoom: 19 }
);

let satelliteActive = false;


map.zoomControl.setPosition("bottomleft");


const markerLayer = L.layerGroup().addTo(map);
let heatLayer = null;
let heatmapActive = false;

function severityIcon(incident) {
  const c = RISK_COLORS[incident.severity];
  const pulse = incident.live
    ? `<div class="marker-pulse" style="border-color:${c.fill}"></div>` : "";
  const size = incident.severity === "critical" ? 18 : incident.severity === "high" ? 14 : 11;
  return L.divIcon({
    className: "",
    iconAnchor: [size/2, size/2],
    html: `
      <div class="custom-marker" style="
        width:${size}px;height:${size}px;
        background:${c.fill};
        border:2px solid ${c.line};
        border-radius:50%;
        box-shadow:0 0 ${incident.live?14:8}px ${c.fill}88;
        position:relative;
      ">${pulse}</div>
    `,
  });
}

function popupHTML(inc) {
  const sc = RISK_COLORS[inc.severity];
  const deadStr = inc.deaths != null ? `<p>🕯 Deaths recorded: <strong>${inc.deaths}</strong></p>` : "";
  const liveStr = inc.live ? `<p style="color:#ff8800;font-size:0.7rem;letter-spacing:0.08em">⚡ ACTIVE — Monitoring ongoing</p>` : "";
  return `
    <div class="map-popup">
      <h4><i class="fas fa-map-marker-alt"></i> ${inc.location}, ${inc.state}</h4>
      <p>📅 Date: ${inc.date}</p>
      <p>⚠ Cause: ${inc.cause}</p>
      <p>${inc.desc}</p>
      ${deadStr}
      ${liveStr}
      <span class="popup-sev" style="background:${sc.fill}22;color:${sc.fill};border:1px solid ${sc.fill}55">
        ${inc.severity.toUpperCase()}
      </span>
    </div>
  `;
}

function renderMarkers() {
  markerLayer.clearLayers();
  HISTORICAL_INCIDENTS.forEach(inc => {
    L.marker([inc.lat, inc.lng], { icon: severityIcon(inc) })
      .bindPopup(popupHTML(inc), { maxWidth: 260 })
      .addTo(markerLayer);
  });
}

renderMarkers();


function buildHeatData() {
  return HISTORICAL_INCIDENTS.map(inc => {
    const weight = inc.severity === "critical" ? 1.0 : inc.severity === "high" ? 0.7 : inc.severity === "moderate" ? 0.4 : 0.2;
    return [inc.lat, inc.lng, weight];
  });
}

function toggleHeatmap() {
  heatmapActive = !heatmapActive;
  document.getElementById("btnHeatmap").classList.toggle("active", heatmapActive);

  if (heatmapActive) {
    if (typeof L.heatLayer === "function") {
      heatLayer = L.heatLayer(buildHeatData(), {
        radius: 35,
        blur: 20,
        maxZoom: 10,
        gradient: { 0.2: "#00cc66", 0.4: "#ffcc00", 0.6: "#ff8800", 0.8: "#ff3333", 1.0: "#ff0066" },
      }).addTo(map);
    } else {
      console.warn("Leaflet.heat not loaded — heatmap unavailable");
    }
    markerLayer.remove();
  } else {
    if (heatLayer) { heatLayer.remove(); heatLayer = null; }
    markerLayer.addTo(map);
  }
}


document.getElementById("btnReset").addEventListener("click", () => {
  map.flyTo(INDIA_CENTER, INDIA_ZOOM, { duration: 1 });
});

document.getElementById("btnHeatmap").addEventListener("click", toggleHeatmap);

document.getElementById("btnSatellite").addEventListener("click", () => {
  satelliteActive = !satelliteActive;
  document.getElementById("btnSatellite").classList.toggle("active", satelliteActive);
  if (satelliteActive) {
    osmLayer.remove();
    satLayer.addTo(map);
  } else {
    satLayer.remove();
    osmLayer.addTo(map);
  }
});


const searchInput   = document.getElementById("locationSearch");
const suggestBox    = document.getElementById("suggestions");
const resultCard    = document.getElementById("locationResult");
const resultName    = document.getElementById("resultName");
const riskBarFill   = document.getElementById("riskBarFill");
const riskLabel     = document.getElementById("riskLabel");
const resultStats   = document.getElementById("resultStats");

let debounceTimer = null;
let searchMarker  = null;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const q = searchInput.value.trim();
  if (q.length < 3) { closeSuggestions(); return; }
  debounceTimer = setTimeout(() => fetchSuggestions(q), 300);
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) doSearch(q);
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const q = searchInput.value.trim();
  if (q) doSearch(q);
});


document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrapper")) closeSuggestions();
});

function closeSuggestions() {
  suggestBox.classList.remove("open");
  suggestBox.innerHTML = "";
}


async function fetchSuggestions(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&addressdetails=1&limit=6`;
  try {
    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    const data = await res.json();
    renderSuggestions(data);
  } catch (err) {
    console.error("Nominatim error:", err);
  }
}

function renderSuggestions(places) {
  suggestBox.innerHTML = "";
  if (!places || places.length === 0) { closeSuggestions(); return; }

  places.forEach(p => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    const icon = placeIcon(p);
    item.innerHTML = `<i class="fas ${icon}"></i><span>${p.display_name}</span>`;
    item.addEventListener("click", () => {
      searchInput.value = p.display_name;
      closeSuggestions();
      flyToResult(p);
    });
    suggestBox.appendChild(item);
  });

  suggestBox.classList.add("open");
}

function placeIcon(p) {
  const t = (p.type || "") + " " + (p.class || "");
  if (t.includes("city") || t.includes("town") || t.includes("municipality")) return "fa-city";
  if (t.includes("village") || t.includes("hamlet")) return "fa-house";
  if (t.includes("mountain") || t.includes("peak") || t.includes("hill")) return "fa-mountain";
  if (t.includes("river") || t.includes("water")) return "fa-water";
  if (t.includes("road") || t.includes("highway")) return "fa-road";
  if (t.includes("state") || t.includes("district")) return "fa-map";
  return "fa-location-dot";
}


async function doSearch(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&addressdetails=1&limit=1`;
  try {
    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    const data = await res.json();
    if (data && data.length > 0) {
      closeSuggestions();
      flyToResult(data[0]);
    } else {
      showNotFound();
    }
  } catch (err) {
    console.error("Search error:", err);
  }
}

function flyToResult(place) {
  const lat = parseFloat(place.lat);
  const lng = parseFloat(place.lon);
  const name = place.display_name.split(",")[0].trim();
  const addr = place.address || {};

  map.flyTo([lat, lng], 10, { duration: 1.4 });

  
  if (searchMarker) { searchMarker.remove(); searchMarker = null; }

 
  const riskInfo = assessRisk(addr, lat, lng);

  // Drop marker
  searchMarker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: "",
      iconAnchor: [12, 24],
      html: `<div style="
        width:24px;height:24px;
        background:#00c8ff;
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 0 16px #00c8ff88;
      "></div>`,
    })
  }).addTo(map)
    .bindPopup(`
      <div class="map-popup">
        <h4>📍 ${name}</h4>
        <p>Risk Level: <strong style="color:${RISK_SCORE_COLORS[riskInfo.level]}">${riskInfo.level.toUpperCase()}</strong></p>
        <p>Risk Score: ${riskInfo.score}/100</p>
      </div>
    `, { maxWidth: 220 })
    .openPopup();

  
  showResultCard(name, riskInfo);
}

function showNotFound() {
  resultCard.classList.remove("hidden");
  resultName.textContent = "Location not found in India";
  riskBarFill.style.width = "0%";
  riskLabel.textContent = "";
  resultStats.innerHTML = `<p style="color:rgba(255,255,255,0.4);font-size:0.78rem">Try a different city or district name.</p>`;
}


function assessRisk(addr, lat, lng) {
  
  const stateRaw = (addr.state || "").toLowerCase();
  if (STATE_RISK[stateRaw]) {
    const r = STATE_RISK[stateRaw];
    return { score: r.score, level: r.level, incidents: r.incidents, avgAnnual: r.avgAnnual, source: "state" };
  }

  
  let minDist = Infinity;
  let nearestInc = null;
  HISTORICAL_INCIDENTS.forEach(inc => {
    const d = haversine(lat, lng, inc.lat, inc.lng);
    if (d < minDist) { minDist = d; nearestInc = inc; }
  });

  if (minDist < 80) {
    const raw = RISK_COLORS[nearestInc.severity];
    const score = nearestInc.severity === "critical" ? 85 : nearestInc.severity === "high" ? 70 : nearestInc.severity === "moderate" ? 50 : 30;
    return { score, level: nearestInc.severity, incidents: null, avgAnnual: null, source: "proximity", dist: Math.round(minDist) };
  }

  
  return { score: 15, level: "low", incidents: null, avgAnnual: null, source: "default" };
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*
            Math.sin(dLng/2)*Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function deg2rad(d) { return d * Math.PI / 180; }

function showResultCard(name, risk) {
  resultName.textContent = name;
  resultCard.classList.remove("hidden");

  
  setTimeout(() => {
    riskBarFill.style.width = risk.score + "%";
    riskBarFill.style.background = `linear-gradient(90deg, ${RISK_SCORE_COLORS[risk.level]}88, ${RISK_SCORE_COLORS[risk.level]})`;
  }, 50);

  riskLabel.textContent = risk.level.toUpperCase();
  riskLabel.style.color = RISK_SCORE_COLORS[risk.level];

  let statsHTML = "";
  if (risk.incidents != null) {
    statsHTML += `
      <div class="mini-stat"><strong>${risk.incidents}</strong>Total Incidents</div>
      <div class="mini-stat"><strong>~${risk.avgAnnual}/yr</strong>Avg Annual</div>
    `;
  } else if (risk.dist != null) {
    statsHTML += `
      <div class="mini-stat"><strong>${risk.dist} km</strong>Nearest incident</div>
      <div class="mini-stat"><strong>${risk.score}/100</strong>Risk score</div>
    `;
  } else {
    statsHTML += `
      <div class="mini-stat"><strong>${risk.score}/100</strong>Risk score</div>
      <div class="mini-stat"><strong>Plains</strong>Low risk zone</div>
    `;
  }
  resultStats.innerHTML = statsHTML;
}


const FEED_MESSAGES = [
  { location: "Devprayag, Uttarakhand",    severity: "critical", msg: "Active slide blocking NH-58. Rescue teams deployed.",    time: "2 min ago" },
  { location: "Kullu Valley, HP",           severity: "high",     msg: "Cloudburst triggers 3 landslides. Villages isolated.",   time: "18 min ago" },
  { location: "Kalimpong, West Bengal",     severity: "moderate", msg: "NH-10 partially blocked. Traffic diverted.",             time: "42 min ago" },
  { location: "Cherrapunji, Meghalaya",     severity: "high",     msg: "Extreme rainfall warning. Slope movement detected.",     time: "1 hr ago" },
  { location: "Wayanad, Kerala",            severity: "moderate", msg: "Soil saturation at 87%. Precautionary evacuation.",      time: "2 hr ago" },
  { location: "Shimla, Himachal Pradesh",   severity: "high",     msg: "Retaining wall failure. Road closed.",                   time: "3 hr ago" },
  { location: "Sikkim NH-10",               severity: "critical", msg: "Major slide debris. Army assistance sought.",            time: "4 hr ago" },
  { location: "Kameng, Arunachal Pradesh",  severity: "moderate", msg: "Bridge approach damaged. Alternate route operational.",  time: "5 hr ago" },
];

function renderFeed() {
  const feed = document.getElementById("incidentFeed");
  feed.innerHTML = "";

  FEED_MESSAGES.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = `feed-item severity-${item.severity}`;
    li.style.animationDelay = (i * 80) + "ms";
    li.innerHTML = `
      <div class="feed-loc">
        <i class="fas fa-circle-exclamation"></i>
        ${item.location}
        <span class="feed-sev-badge sev-${item.severity}">${item.severity}</span>
      </div>
      <div style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin-bottom:3px">${item.msg}</div>
      <div class="feed-meta"><i class="fas fa-clock"></i> ${item.time}</div>
    `;
    feed.appendChild(li);
  });
}


let liveEventIndex = 0;
const LIVE_EVENTS = [
  { location: "Manali, HP",             severity: "high",     msg: "Rock fall on Rohtang approach road.",          time: "just now" },
  { location: "Gangtok, Sikkim",        severity: "moderate", msg: "Drainage failure causing road undermining.",   time: "just now" },
  { location: "Kalpetta, Kerala",       severity: "high",     msg: "River bank erosion — 12 families evacuated.",  time: "just now" },
  { location: "Tawang, Arunachal",      severity: "critical", msg: "Major debris flow near army camp. Alert sent.",time: "just now" },
];

function injectLiveEvent() {
  const ev = LIVE_EVENTS[liveEventIndex % LIVE_EVENTS.length];
  liveEventIndex++;

  const feed = document.getElementById("incidentFeed");
  const li = document.createElement("li");
  li.className = `feed-item severity-${ev.severity}`;
  li.style.border = "1px solid rgba(0,200,255,0.25)";
  li.innerHTML = `
    <div class="feed-loc">
      <i class="fas fa-satellite-dish" style="color:#00c8ff"></i>
      ${ev.location}
      <span class="feed-sev-badge sev-${ev.severity}">${ev.severity}</span>
      <span style="font-size:0.6rem;color:#00c8ff;margin-left:4px">NEW</span>
    </div>
    <div style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin-bottom:3px">${ev.msg}</div>
    <div class="feed-meta"><i class="fas fa-clock"></i> ${ev.time}</div>
  `;

  feed.insertBefore(li, feed.firstChild);
  if (feed.children.length > 10) feed.removeChild(feed.lastChild);
}


function updateStats() {
  document.getElementById("statTotal").textContent  = "1,842";
  document.getElementById("statActive").textContent = "14";
  document.getElementById("statStates").textContent = "18";
}


function updateTimestamp() {
  const now = new Date();
  document.getElementById("lastUpdated").textContent =
    now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}


function initRainCanvas() {
  const container = document.getElementById("rainCanvas");
  const header = document.querySelector(".risk-header");
  if (!container || !header) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.18";
  container.appendChild(canvas);

  function resize() {
    canvas.width  = header.offsetWidth;
    canvas.height = header.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const ctx = canvas.getContext("2d");
  const drops = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: 8 + Math.random() * 18,
    speed: 4 + Math.random() * 6,
    opacity: 0.2 + Math.random() * 0.6,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1, d.y + d.len);
      ctx.strokeStyle = `rgba(0,200,255,${d.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      d.y += d.speed;
      d.x -= 0.5;
      if (d.y > canvas.height) {
        d.y = -d.len;
        d.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}


document.addEventListener("DOMContentLoaded", () => {
  initRainCanvas();
  renderFeed();
  updateStats();
  updateTimestamp();

  setInterval(updateTimestamp, 1000);
  setInterval(injectLiveEvent, 25000);
});