const express = require('express');
const { getData } = require('../utils/dataLoader');

const router = express.Router();

// Home
router.get('/', (req, res) => {
  const home = getData('home');
  const portfolio = getData('portfolio');
  const featured = portfolio.projects.filter((p) => home.featuredProjects.includes(p.slug));

  res.render('index', { pageTitle: 'Home', home, featured });
});

// About
router.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About', about: getData('about') });
});

// Portfolio list
router.get('/portfolio', (req, res) => {
  res.render('portfolio', { pageTitle: 'Portfolio', portfolio: getData('portfolio') });
});

// Single project
router.get('/portfolio/:slug', (req, res, next) => {
  const portfolio = getData('portfolio');
  const index = portfolio.projects.findIndex((p) => p.slug === req.params.slug);
  if (index === -1) return next(); // falls through to 404

  const project = portfolio.projects[index];
  const total = portfolio.projects.length;
  const prev = portfolio.projects[(index - 1 + total) % total];
  const next_ = portfolio.projects[(index + 1) % total];

  res.render('project', { pageTitle: project.title, project, prev, next: next_ });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact', contact: getData('contact') });
});

module.exports = router;
