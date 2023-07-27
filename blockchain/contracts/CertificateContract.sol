// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateContract {
    mapping(address => bool) private certificates;

    event CertificateIssued(address indexed student, string certificateHash);

    function issueCertificate(address studentAddress, string memory certificateHash) public {
        require(!certificates[studentAddress], "Certificate already issued");
        certificates[studentAddress] = true;
        emit CertificateIssued(studentAddress, certificateHash);
    }

    function verifyCertificate(address studentAddress) public view returns (bool) {
        return certificates[studentAddress];
    }
}
