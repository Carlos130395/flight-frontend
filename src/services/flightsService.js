import axios from 'axios';

const API_URL = 'http://localhost:3001/flights';

export const bookFlight = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/book`, flightData);
    return response.data;
  } catch (error) {
    console.error('Error booking flight:', error);
    throw error;
  }
};

export const cancelBooking = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/cancel`, flightData);
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};
