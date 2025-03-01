const express = require("express");
const {
  handelGetSchemes,
  handelGetSchemeById,
  handleSaveScheme,
} = require("../controllers/schemesController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", handelGetSchemes);

router.get("/:id", handelGetSchemeById);

router.post("/:id/save", authenticateToken, handleSaveScheme);

module.exports = router;
