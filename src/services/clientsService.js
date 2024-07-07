import axios from 'axios';

const API_URL = 'http://localhost:3001/clients';

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getClient = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting client:', error);
    throw error;
  }
};
