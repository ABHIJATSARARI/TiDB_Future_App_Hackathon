// controllers/certificateController.js
// This file defines the functions that handle the requests related to certificates

// Import modules
const Certificate = require("../models/Certificate");
const blockchainUtils = require("../utils/blockchainUtils");

// Define controller functions
const certificateController = {};

// Get all certificates
certificateController.getAllCertificates = async (req, res, next) => {
  try {
    // Get all certificates from the database
    const certificates = await Certificate.find();

    // Return success response with certificates data
    res.status(200).json({ certificates });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Get a certificate by id
certificateController.getCertificateById = async (req, res, next) => {
  try {
    // Get the certificate id from the request parameters
    const { id } = req.params;

    // Find the certificate by id from the database
    const certificate = await Certificate.findById(id);

    // Check if the certificate exists
    if (!certificate) {
      // Return error response with not found message
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Return success response with certificate data
    res.status(200).json({ certificate });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Create a new certificate
certificateController.createCertificate = async (req, res, next) => {
  try {
    // Get the certificate data from the request body
    const { name, institution, course, grade, issuedAt } = req.body;

    // Validate the certificate data
    if (!name || !institution || !course || !grade || !issuedAt) {
      // Return error response with bad request message
      return res.status(400).json({ message: "Missing or invalid data" });
    }

    // Create a new certificate instance with the data
    const certificate = new Certificate({
      name,
      institution,
      course,
      grade,
      issuedAt,
    });

    // Save the certificate to the database
    await certificate.save();

    // Issue the certificate on the blockchain using web3.js and blockchainUtils.js
    await blockchainUtils.issueCertificate(certificate);

    // Return success response with created message and certificate data
    res.status(201).json({ message: "Certificate created", certificate });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Verify a certificate by id
certificateController.verifyCertificateById = async (req, res, next) => {
  try {
    // Get the certificate id from the request parameters
    const { id } = req.params;

    // Find the certificate by id from the database
    const certificate = await Certificate.findById(id);

    // Check if the certificate exists
    if (!certificate) {
      // Return error response with not found message
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Verify the certificate on the blockchain using web3.js and blockchainUtils.js
    const verified = await blockchainUtils.verifyCertificate(certificate);

    // Return success response with verified status and certificate data
    res.status(200).json({ verified, certificate });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Export controller functions
module.exports = certificateController;
