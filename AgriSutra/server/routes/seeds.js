const express = require("express");
const { predictCrop } = require("../controllers/seedsController");

const router = express.Router();

// Route for Crop Prediction
router.post("/predict", predictCrop);

module.exports = router;
