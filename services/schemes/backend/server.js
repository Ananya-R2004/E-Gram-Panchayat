const express = require('express');
const cors = require('cors');
const schemeRoutes = require('./routes/schemes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ Schemes & Policy Backend is running'));

// mount routes at /api/schemes
app.use('/api/schemes', schemeRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
