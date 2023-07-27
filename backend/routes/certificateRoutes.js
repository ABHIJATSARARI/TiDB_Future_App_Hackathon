// routes/certificateRoutes.js
// This file defines the routes for the certificate-related requests

// Import modules
const express = require("express");
const certificateController = require("../controllers/certificateController");

// Create the router
const router = express.Router();

// Define the routes
router.get("/", certificateController.getAllCertificates);
router.get("/:id", certificateController.getCertificateById);
router.post("/", certificateController.createCertificate);
router.get("/:id/verify", certificateController.verifyCertificateById);

// Export the router
module.exports = router;
