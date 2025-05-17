import axios from 'axios';
import { errorHandler } from '../../components/ErrorHandler';
import { getWithExpiry } from '../../features/utility/utility';

const BASE_URL = import.meta.env.VITE_BASE_DEV_URL || 'http://localhost:3000'; // Updated to use Vite's import.meta.env with a fallback

export const transferFunds = async transfer => {
  try {
    const token = getWithExpiry('token');
    if (!token) {
      errorHandler('User not authenticated. Please log in.');
      return;
    }

    const response = await axios.post(`${BASE_URL}/api/v1/account/transfer`, transfer, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: 'An unknown error occurred' });
  }
};
