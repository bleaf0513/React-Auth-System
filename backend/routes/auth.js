const express = require("express");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, forgotPassword, resetPassword, getProtected, getPassportProtected, getUserProfile } = require("../controllers/authController");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected with custom JWT middleware
router.get("/protected", authMiddleware, getProtected);

// Protected with Passport.js
router.get(
  "/passport-protected",
  passport.authenticate("jwt", { session: false }),
  getPassportProtected
);

// User profile endpoint
router.get("/user/profile", authMiddleware, getUserProfile);

module.exports = router;
