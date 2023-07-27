// models/Certificate.js
// This file defines the schema and model for the Certificate document

// Import modules
const mongoose = require("mongoose");

// Define the schema
const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    required: true,
  },
  blockchainHash: {
    type: String,
    unique: true,
  },
});

// Define the model
const Certificate = mongoose.model("Certificate", certificateSchema);

// Export the model
module.exports = Certificate;
