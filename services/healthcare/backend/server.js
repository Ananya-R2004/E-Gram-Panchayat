const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const hospitals = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'hospitals.json')));
const emergency = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'emergency.json')));

// GET /api/hospitals?q=term&specialty=Heart
app.get('/api/hospitals', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    const specialty = (req.query.specialty || '').toLowerCase();
    let results = hospitals;
    if (q) {
        results = results.filter(h =>
            h.name.toLowerCase().includes(q) ||
            h.address.toLowerCase().includes(q) ||
            h.city.toLowerCase().includes(q)
        );
    }
    if (specialty) {
        results = results.filter(h =>
            h.specialties.some(s => s.toLowerCase().includes(specialty))
        );
    }
    res.json(results);
});

// GET single hospital by id
app.get('/api/hospitals/:id', (req, res) => {
    const id = req.params.id;
    const h = hospitals.find(x => x.id === id);
    if (!h) return res.status(404).json({error: 'Not found'});
    res.json(h);
});

app.get('/api/emergency', (req, res) => {
    res.json(emergency.contacts);
});

// GET pre-hospital instructions: /api/instructions?condition=heart_attack
app.get('/api/instructions', (req, res) => {
    const cond = (req.query.condition || '').toLowerCase();
    if (!cond) return res.json(emergency.instructions);
    const inst = emergency.instructions[cond] || null;
    if (!inst) return res.status(404).json({error:'Condition not found'});
    res.json({condition: cond, steps: inst});
});

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => console.log('Healthcare backend running on port', PORT));
