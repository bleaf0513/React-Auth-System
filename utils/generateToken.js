const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "yourSecretKey", { expiresIn: "1h" });
};

module.exports = generateToken;