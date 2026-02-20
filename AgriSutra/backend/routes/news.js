const express = require('express');
const { handelGetNews } = require('../controllers/newsController');
const router = express.Router();

router.get('/', handelGetNews);

module.exports = router;
