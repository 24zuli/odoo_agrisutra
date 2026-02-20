const express = require("express");

const {
    handleUserRegister,
    handleUserProfile,
    handleUserLogin,
    handleForgotPassword,
    handleResetPassword,
} = require("../controllers/authController");

require("dotenv").config();

const router = express.Router();

router.post("/register", handleUserRegister);
router.get("/userProfile", handleUserProfile);
router.post("/login", handleUserLogin);
router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password", handleResetPassword);

module.exports = router;