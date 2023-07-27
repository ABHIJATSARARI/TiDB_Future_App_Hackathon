const CertificateContract = artifacts.require("CertificateContract");
const StudentContract = artifacts.require("StudentContract");

module.exports = function (deployer) {
  deployer.deploy(CertificateContract);
  deployer.deploy(StudentContract);
};
