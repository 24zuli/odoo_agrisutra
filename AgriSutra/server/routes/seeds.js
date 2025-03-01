// const express = require("express");
// const { predictCrop } = require("../controllers/seedsController");

// const router = express.Router();

// // Route for Crop Prediction
// router.post("/predict", predictCrop);

// module.exports = router;


const express = require("express");
const { predictCrop, upload } = require("../controllers/seedsController");

const router = express.Router();

// Route for Crop Prediction (Now Accepts File Uploads)
router.post("/predict", upload.single("file"), predictCrop);

module.exports = router;
