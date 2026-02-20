const express = require("express");
const { verifyToken, updateUserLocation } = require("../controllers/userController");
const router = express.Router();

// ✅ Route to Update User Location After Login
router.put("/update-location/:userId", verifyToken, updateUserLocation);

module.exports = router;
