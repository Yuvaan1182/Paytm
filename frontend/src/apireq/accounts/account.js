import axios from 'axios';

export const transferFunds = async (transfer) => {
    try {
        const response = await axios.post('/api/account/transfer', transfer);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUsers = async (filter) => {
  try {
    const response = await axios.get(`/api/account/bulk?filter=${filter}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}