import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export default api;