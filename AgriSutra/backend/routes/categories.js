const express = require("express");
const { getCategories } = require("../controllers/categoriesController"); // Import controller
const router = express.Router();

// Route to get categories
router.get("/", getCategories);

module.exports = router;
