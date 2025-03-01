const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { getEquipmentByCategory, addEquipment, getAvailableEquipment } = require("../controllers/equipmentController");

// ✅ Fetch all available equipment (optional filters: category, availability)
router.get("/available", getAvailableEquipment);

// ✅ Fetch equipment by category
router.get("/:category", getEquipmentByCategory);

// ✅ Add new equipment (Protected Route)
router.post("/", authenticateToken, addEquipment);

module.exports = router;
