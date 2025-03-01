const express = require("express");
const router = express.Router();
const { getEquipmentByCategory } = require("../controllers/equipmentController");

// Route to fetch equipment by category
router.get("/:category", getEquipmentByCategory);

module.exports = router;
