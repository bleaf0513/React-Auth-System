const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");


const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

    dotenv.config({ path: envFile });

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Auth System API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
