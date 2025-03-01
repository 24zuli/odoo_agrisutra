// server/routes/marketTrends.js
const express = require('express');
const { getMarketData } = require('../controllers/marketTrendsController');
const router = express.Router();
// const { scrapeMarketData } = require('../scraping/pupScraper');

router.get('/', getMarketData);

module.exports = router;