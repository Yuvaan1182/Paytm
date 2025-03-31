import axios from 'axios';
import { errorHandler } from '../../components/ErrorHandler';

export const transferFunds = async (transfer) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'))?.token || undefined;
        if (!token) {
            errorHandler("User not authenticated. Please log in.");
            return;
        }
        const response = await axios.post('/api/v1/account/transfer', transfer, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        errorHandler(error);
        if (error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject({ message: "An unknown error occurred" });
    }
};
