import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const getChores = async () => {
  try {
    const response = await axios.get(`${API_URL}/chores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chores:', error);
    throw error;
  }
};

export const calculateChorePlan = async (targetAmount, strategy) => {
  try {
    const response = await axios.post(`${API_URL}/chores/calculate`, {
      targetAmount,
      strategy
    });
    return response.data;
  } catch (error) {
    console.error('Error calculating chore plan:', error);
    throw error;
  }
};