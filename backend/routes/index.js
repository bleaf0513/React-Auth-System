const express = require("express");
const passport = require("passport");
const authRoutes = require("./auth");
require("../config/passport")(passport);

const router = express.Router();

router.use(passport.initialize());
router.use("/auth", authRoutes);

module.exports = router;
