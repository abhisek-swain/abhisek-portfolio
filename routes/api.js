const express = require('express');
const { getData, listData } = require('../utils/dataLoader');

const router = express.Router();

// GET /api  -> list of available endpoints
router.get('/', (req, res) => {
  res.json({
    name: 'Abhisek Swain Portfolio API',
    endpoints: listData().map((name) => `/api/${name}`)
  });
});

// GET /api/portfolio/:slug -> a single project
router.get('/portfolio/:slug', (req, res) => {
  const portfolio = getData('portfolio');
  const project = portfolio.projects.find((p) => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// GET /api/:page -> raw JSON of any data file (home, about, portfolio, contact, site)
router.get('/:page', (req, res) => {
  const data = getData(req.params.page);
  if (!data) return res.status(404).json({ error: 'Data not found' });
  res.json(data);
});

module.exports = router;
