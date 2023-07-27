import React, { useState } from 'react';
import certificateService from '../services/certificateService';

const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificateInfo, setCertificateInfo] = useState(null);

  const handleVerification = async () => {
    try {
      const response = await certificateService.verifyCertificate(certificateId);
      setCertificateInfo(response.certificate);
      // Handle the certificate information and display it to the user.
    } catch (error) {
      console.error('Certificate Verification Error:', error);
      // Handle errors and show appropriate messages to the user.
    }
  };

  return (
    <div>
      <h2>Certificate Verification</h2>
      <input
        type="text"
        placeholder="Certificate ID"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
      />
      <button onClick={handleVerification}>Verify Certificate</button>

      {certificateInfo && (
        <div>
          <h3>Verified Certificate Information:</h3>
          <p>Student ID: {certificateInfo.studentId}</p>
          <p>Course: {certificateInfo.course}</p>
          <p>Date of Completion: {certificateInfo.dateOfCompletion}</p>
          {/* Display other certificate information here */}
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;
