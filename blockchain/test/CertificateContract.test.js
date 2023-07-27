const CertificateContract = artifacts.require("CertificateContract");

contract("CertificateContract", (accounts) => {
  let certificateContract;

  before(async () => {
    certificateContract = await CertificateContract.deployed();
  });

  it("should issue a certificate", async () => {
    const studentAddress = accounts[0];
    const certificateHash = "certificate_hash_example";

    await certificateContract.issueCertificate(studentAddress, certificateHash);

    const isCertificateIssued = await certificateContract.verifyCertificate(studentAddress);
    assert(isCertificateIssued, "Certificate was not issued");
  });
});
