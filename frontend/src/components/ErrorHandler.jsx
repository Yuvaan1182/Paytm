import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Error Handler
export const errorHandler = (error, customMessage = '') => {
  // Check if it's an Axios error (for API requests)
  if (error.response) {
    const { status, data } = error.response;

    // Log the error (you can integrate with a service like Sentry here)
    console.error('API Error:', error.response);

    // Display specific messages based on status codes
    switch (status) {
      case 400:
        toast.error(data.message || customMessage || 'Bad Request!');
        break;
      case 401:
        toast.error('Unauthorized! Please log in again.');
        break;
      case 403:
        toast.error('Access Forbidden!');
        break;
      case 404:
        toast.error('Resource Not Found!');
        break;
      case 411:
        toast.error('Invalid Email/Password');
        break;
      case 500:
        toast.error('Internal Server Error. Please try again later.');
        break;
      default:
        toast.error(data.message || 'An unexpected error occurred.');
    }
  } else if (error.request) {
    // Handle network errors or no response
    toast.error('No response from server. Please check your network.');
  } else {
    // Handle unexpected or client-side errors
    toast.error(customMessage || error.message || 'Something went wrong!');
  }
};
