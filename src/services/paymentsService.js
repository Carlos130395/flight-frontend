import axios from 'axios';

const API_URL = 'http://localhost:3001/payments';

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/process`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const failPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/fail`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error failing payment:', error);
    throw error;
  }
};
