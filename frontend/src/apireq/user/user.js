import axios from 'axios';
import { errorHandler } from '../../components/ErrorHandler';
import { getWithExpiry } from '../../features/utility/utility';

const BASE_URL = import.meta.env.VITE_BASE_DEV_URL || 'http://localhost:3000'; // Updated to use Vite's import.meta.env with a fallback

export const userSignup = async user => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Signup request response', response);

    return response.data;
  } catch (error) {
    errorHandler(error);

    // Return the error response so it can be handled in the calling code
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: 'An unknown error occurred' });
  }
};

export const userSignin = async user => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, user, {
      headers: {
        'Content-Type': 'application/json',
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

export const updateUser = async user => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/user`, user);
    return response.data;
  } catch (error) {
    errorHandler(error);

    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: 'An unknown error occurred' });
  }
};

export const getUsers = async filter => {
  try {
    const token = getWithExpiry('token');

    if (!token) {
      errorHandler('Authentication Failed, Please login to access this feature.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/user/bulk?filter=${filter}`, {
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

export const getUserData = async () => {
  try {
    const token = getWithExpiry('token');

    if (!token) {
      errorHandler('Authentication Failed, Please login to access this feature.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/user/`, {
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

export const getBalance = async () => {
  try {
    const token = getWithExpiry('token');

    if (!token) {
      errorHandler('Authentication Failed, Please login to access this feature.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/account/balance`, {
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