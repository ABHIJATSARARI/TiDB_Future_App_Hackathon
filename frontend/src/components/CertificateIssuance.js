import React, { useState } from 'react';
import certificateService from '../services/certificateService';

const CertificateIssuance = () => {
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [dateOfCompletion, setDateOfCompletion] = useState('');

  const handleIssuance = async () => {
    try {
      const certificateData = { studentId, course, dateOfCompletion };
      const response = await certificateService.issueCertificate(certificateData);
      console.log('Certificate Issued:', response);
      // You can handle the response and show success messages to the user.
    } catch (error) {
      console.error('Certificate Issuance Error:', error);
      // Handle errors and show appropriate messages to the user.
    }
  };

  return (
    <div>
      <h2>Certificate Issuance</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <input
        type="date"
        value={dateOfCompletion}
        onChange={(e) => setDateOfCompletion(e.target.value)}
      />
      <button onClick={handleIssuance}>Issue Certificate</button>
    </div>
  );
};

export default CertificateIssuance;
