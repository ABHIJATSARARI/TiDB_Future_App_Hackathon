// utils/blockchainUtils.js
// This file defines the utility functions for interacting with the blockchain

// Import modules
const Web3 = require("web3");
const CertificateContract = require("../blockchain/build/contracts/CertificateContract.json");
const StudentContract = require("../blockchain/build/contracts/StudentContract.json");

// Define utility functions
const blockchainUtils = {};

// Initialize web3 with a provider
blockchainUtils.web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);

// Get the default account from web3
blockchainUtils.defaultAccount = blockchainUtils.web3.eth.accounts[0];

// Get the contract instances from web3 and the contract artifacts
blockchainUtils.certificateContract = blockchainUtils.web3.eth.contract(
  CertificateContract.abi
).at(CertificateContract.networks["5777"].address);

blockchainUtils.studentContract = blockchainUtils.web3.eth.contract(
  StudentContract.abi
).at(StudentContract.networks["5777"].address);

// Issue a certificate on the blockchain
blockchainUtils.issueCertificate = async (certificate) => {
  // Get the certificate data
  const { name, institution, course, grade, issuedAt } = certificate;

  // Convert the issuedAt date to a unix timestamp
  const issuedAtTimestamp = Math.floor(issuedAt.getTime() / 1000);

  // Call the issueCertificate function from the certificate contract
  const result = await blockchainUtils.certificateContract.issueCertificate(
    name,
    institution,
    course,
    grade,
    issuedAtTimestamp,
    {
      from: blockchainUtils.defaultAccount,
      gas: 3000000,
    }
  );

  // Get the transaction hash from the result
  const transactionHash = result.tx;

  // Update the certificate document with the transaction hash
  certificate.blockchainHash = transactionHash;
  await certificate.save();
};

// Verify a certificate on the blockchain
blockchainUtils.verifyCertificate = async (certificate) => {
  // Get the certificate data
  const { name, institution, course, grade, issuedAt, blockchainHash } =
    certificate;

  // Convert the issuedAt date to a unix timestamp
  const issuedAtTimestamp = Math.floor(issuedAt.getTime() / 1000);

  // Call the verifyCertificate function from the certificate contract
  const result = await blockchainUtils.certificateContract.verifyCertificate(
    name,
    institution,
    course,
    grade,
    issuedAtTimestamp,
    blockchainHash,
    {
      from: blockchainUtils.defaultAccount,
      gas: 3000000,
    }
  );

  // Return the result as a boolean value
  return result;
};

// Register a student on the blockchain
blockchainUtils.registerStudent = async (student) => {
  // Get the student data
  const { name, email, phone, address } = student;

  // Call the registerStudent function from the student contract
  const result = await blockchainUtils.studentContract.registerStudent(
    name,
    email,
    phone,
    address,
    {
      from: blockchainUtils.defaultAccount,
      gas: 3000000,
    }
  );

  // Get the student address from the result
  const studentAddress = result.logs[0].args.studentAddress;

  // Update the student document with the student address
  student.blockchainAddress = studentAddress;
  await student.save();
};

// Export utility functions
module.exports = blockchainUtils;
