const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY || '';

const VENDORS_FILE = path.join(__dirname, 'vendors.json');
let vendors = [];
try {
  vendors = JSON.parse(fs.readFileSync(VENDORS_FILE, 'utf8'));
} catch (e) {
  console.warn('Could not read vendors.json', e.message);
  vendors = [];
}

// Bangalore center coords
const BENGALURU = { lat: 12.9716, lng: 77.5946 };

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  const city = (req.query.city || 'Bengaluru').trim();

  if (!OPENWEATHERMAP_API_KEY) {
    return res.json({
      source: 'sample',
      city,
      temp_c: 28,
      description: 'Partly cloudy',
      humidity: 60,
      wind_kmph: 8
    });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const r = await fetch(url);
    const data = await r.json();

    if (data.cod !== 200) {
      return res.json({
        source: 'sample',
        city,
        temp_c: 28,
        description: 'Partly cloudy',
        humidity: 60,
        wind_kmph: 8
      });
    }

    res.json({
      source: 'openweathermap',
      city: data.name,
      temp_c: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_kmph: data.wind.speed * 3.6
    });
  } catch (err) {
    res.json({
      source: 'sample',
      city,
      temp_c: 28,
      description: 'Partly cloudy',
      humidity: 60,
      wind_kmph: 8
    });
  }
});

// Vendors endpoint
app.get('/api/vendors', (req, res) => {
  const crop = req.query.crop ? String(req.query.crop).toLowerCase() : null;
  const limit = Math.min(parseInt(req.query.limit || '30', 10), 30);
  const radiusKm = parseFloat(req.query.radiusKm || '50');
  const lat = req.query.lat ? parseFloat(req.query.lat) : BENGALURU.lat;
  const lng = req.query.lng ? parseFloat(req.query.lng) : BENGALURU.lng;

  let list = vendors.map((v) => ({ ...v }));
  list.forEach(
    (v) => (v.distance_km = parseFloat(haversineKm(lat, lng, v.lat, v.lng).toFixed(2)))
  );
  if (crop) list = list.filter((v) => v.crops.some((c) => c.toLowerCase() === crop));
  list = list.filter((v) => v.distance_km <= radiusKm);
  list.sort((a, b) => a.distance_km - b.distance_km);
  res.json({ count: list.length, vendors: list.slice(0, limit) });
});

// Crops endpoint
app.get('/api/crops', (req, res) => {
  const cropMap = {};
  vendors.forEach((v) => {
    v.crops.forEach((c) => {
      if (!cropMap[c]) cropMap[c] = { name: c, vendors: [] };
      cropMap[c].vendors.push({ id: v.id, name: v.name, address: v.address, contact: v.contact });
    });
  });
  const briefInfo = {
    Tomato: 'Warm-season vegetable; needs irrigation and pest control.',
    Onion: 'Bulb crop; grows in loose, fertile soil.',
    Potato: 'Tuber crop; prefers cool seasons for best yield.',
    Banana: 'Perennial fruit; needs tropical warm conditions.',
    Mango: 'Major fruit crop; needs dry season for flowering.',
    Rice: 'Paddy crop; needs standing water in early stages.',
    Maize: 'Cereal crop used for food & feed.'
  };
  const result = Object.values(cropMap).map((ci) => ({
    name: ci.name,
    info: briefInfo[ci.name] || 'General crop info; consult local extension.',
    vendors: ci.vendors
  }));
  res.json({ count: result.length, crops: result });
});

app.listen(PORT, () => console.log(`Agriculture backend running on port ${PORT}`));
