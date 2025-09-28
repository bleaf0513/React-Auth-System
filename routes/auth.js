const express = require("express");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, getProtected, getPassportProtected } = require("../controllers/authController");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected with custom JWT middleware
router.get("/protected", authMiddleware, getProtected);

// Protected with Passport.js
router.get(
  "/passport-protected",
  passport.authenticate("jwt", { session: false }),
  getPassportProtected
);

module.exports = router;
