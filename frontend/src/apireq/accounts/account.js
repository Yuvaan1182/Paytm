import axios from 'axios';

export const getUserBalance = async (account) => {
  try {
    const response = await axios.get('/api/account/balance', account);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const transferFunds = async (transfer) => {
    try {
        const response = await axios.post('/api/account/transfer', transfer);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};