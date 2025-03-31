import axios from 'axios';
import { errorHandler } from '../../components/ErrorHandler';

export const userSignup = async (user) => {
  try {
    const response = await axios.post('/api/v1/user/signup', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("Signup request response", response);

    return response.data;
  } catch (error) {

    errorHandler(error);

    // Return the error response so it can be handled in the calling code
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "An unknown error occurred" });
  }
};

export const userSignin = async (user) => {
    try {
        const response = await axios.post('/api/v1/user/signin', user, {
          headers : {
            'Content-Type': 'application/json',
          }
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

export const updateUser = async (user) => {
  try {
    const response = await axios.put('/api/v1/user', user);
    return response.data;
  } catch (error) {
    errorHandler(error);

    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "An unknown error occurred" });
  }
}

export const getUsers = async (filter) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token || undefined;
    
    if (!token) {
      errorHandler("Authentication Failed, Please login to access this feature.");
    }

    const response = await axios.get(`/api/v1/user/bulk?filter=${filter}`, {
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
}