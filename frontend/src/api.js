import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api';

const api = {
  sendMessage: async (message) => {
    try {
      const response = await axios.post(API_BASE_URL, message, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },
};

export default api;
