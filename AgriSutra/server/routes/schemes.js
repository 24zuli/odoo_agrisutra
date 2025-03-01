const express = require("express");
const {
  handelGetSchemes,
  handelGetSchemeById,
  handleSaveScheme,
  handleGetTrendingSchemes,
  handleGetAllSchemes,
} = require("../controllers/schemesController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", handelGetSchemes);
router.get("/:id", handelGetSchemeById);
router.post("/:id/save", authenticateToken, handleSaveScheme);
router.get("/trending", handleGetTrendingSchemes);
router.get("/all", handleGetAllSchemes);

module.exports = router;
