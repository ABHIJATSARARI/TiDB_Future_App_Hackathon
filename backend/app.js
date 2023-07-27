// app.js
// This file creates and configures the Express app

// Import modules
const express = require("express");
const cors = require("cors");
const certificateRoutes = require("./routes/certificateRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Create the app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/students", studentRoutes);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

// Export the app
module.exports = app;
