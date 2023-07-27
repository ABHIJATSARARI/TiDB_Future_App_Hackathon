// models/Student.js
// This file defines the schema and model for the Student document

// Import modules
const mongoose = require("mongoose");

// Define the schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  blockchainAddress: {
    type: String,
    unique: true,
  },
});

// Define the model
const Student = mongoose.model("Student", studentSchema);

// Export the model
module.exports = Student;
