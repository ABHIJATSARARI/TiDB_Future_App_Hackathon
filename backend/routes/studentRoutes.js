// routes/studentRoutes.js
// This file defines the routes for the student-related requests

// Import modules
const express = require("express");
const studentController = require("../controllers/studentController");

// Create the router
const router = express.Router();

// Define the routes
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);

// Export the router
module.exports = router;
