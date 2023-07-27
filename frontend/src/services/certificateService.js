import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/certificates';

const issueCertificate = async (certificateData) => {
  try {
    const response = await axios.post(`${BASE_URL}/issue`, certificateData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const verifyCertificate = async (certificateId) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify/${certificateId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const certificateService = {
  issueCertificate,
  verifyCertificate,
};

export default certificateService;
