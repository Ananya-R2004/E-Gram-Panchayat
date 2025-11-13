const express = require('express');
const router = express.Router();
const schemes = require('../data/schemesData');

// GET /api/schemes
// supports optional query params: category and search
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = schemes;

  if (category) {
    result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s =>
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.eligibility && s.eligibility.toLowerCase().includes(q)) ||
      (s.benefits && s.benefits.toLowerCase().includes(q))
    );
  }

  res.json(result);
});

module.exports = router;
