const express = require('express');
const cors = require('cors');
const app = express();
const schemes = require('./data/schemes.json');
const PORT = 4005;

app.use(cors());

app.get('/schemes', (req, res) => {
  const { category, search } = req.query;
  let result = schemes;
  if (category) result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
