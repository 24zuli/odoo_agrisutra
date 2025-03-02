const express = require("express");
const {
    getUserProfile,
    updateUserProfile,
} = require("../controllers/profileController.js");

const router = express.Router();

router.get("/", getUserProfile);
router.patch("/", updateUserProfile);

module.exports = router;