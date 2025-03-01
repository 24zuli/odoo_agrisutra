const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/profileController.js");

const router = express.Router();

router.get("/", getUserProfile);
router.post("/", updateUserProfile);

module.exports = router;
