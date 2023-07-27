// controllers/studentController.js
// This file defines the functions that handle the requests related to students

// Import modules
const Student = require("../models/Student");
const blockchainUtils = require("../utils/blockchainUtils");

// Define controller functions
const studentController = {};

// Get all students
studentController.getAllStudents = async (req, res, next) => {
  try {
    // Get all students from the database
    const students = await Student.find();

    // Return success response with students data
    res.status(200).json({ students });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Get a student by id
studentController.getStudentById = async (req, res, next) => {
  try {
    // Get the student id from the request parameters
    const { id } = req.params;

    // Find the student by id from the database
    const student = await Student.findById(id);

    // Check if the student exists
    if (!student) {
      // Return error response with not found message
      return res.status(404).json({ message: "Student not found" });
    }

    // Return success response with student data
    res.status(200).json({ student });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Create a new student
studentController.createStudent = async (req, res, next) => {
  try {
    // Get the student data from the request body
    const { name, email, phone, address } = req.body;

    // Validate the student data
    if (!name || !email || !phone || !address) {
      // Return error response with bad request message
      return res.status(400).json({ message: "Missing or invalid data" });
    }

    // Create a new student instance with the data
    const student = new Student({
      name,
      email,
      phone,
      address,
    });

    // Save the student to the database
    await student.save();

    // Register the student on the blockchain using web3.js and blockchainUtils.js
    await blockchainUtils.registerStudent(student);

    // Return success response with created message and student data
    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    // Pass error to the next middleware
    next(err);
  }
};

// Export controller functions
module.exports = studentController;
