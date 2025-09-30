const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "yourSecretKey", {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save reset token to user (you might want to add these fields to your User model)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // In a real application, you would send an email here
    // For now, we'll just return the reset link
    const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    console.log(`Password reset link for ${email}: ${resetLink}`);
    
    res.json({ 
      message: "Password reset link sent to your email",
      resetLink: resetLink // Only for development - remove in production
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Protected (custom middleware)
const getProtected = (req, res) => {
  res.json({ message: "Welcome! You accessed a protected route.", user: req.user });
};

// Protected (passport)
const getPassportProtected = (req, res) => {
  res.json({ message: "Welcome! Passport protected route.", user: req.user });
};

// User profile endpoint
const getUserProfile = (req, res) => {
  res.json({ 
    message: "User profile retrieved successfully", 
    user: req.user 
  });
};

module.exports = {
  register, 
  login, 
  forgotPassword, 
  resetPassword, 
  getProtected, 
  getPassportProtected, 
  getUserProfile 
};
