const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { getEquipmentDetails, bookEquipment } = require("../controllers/equipmentController");

// ✅ Fetch Equipment Details
router.get("/:equipment_id", getEquipmentDetails);

// ✅ Book Equipment (Protected Route)
router.post("/:equipment_id/book", authenticateToken, bookEquipment);

module.exports = router;
