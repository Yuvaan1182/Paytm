import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance, getUserData, userSignin, userSignup } from '../../apireq/user/user';

export const userRegistration = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await userSignup(user);

      return response;
    } catch (error) {
      console.log('Error during signup:', error);
      return rejectWithValue(error?.message || 'SignUp failed');
    }
  }
);

export const userLogin = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await userSignin(user);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const userProfile = createAsyncThunk(
  'profile/profile',
  async (user, { rejectWithValue }) => {
    try {
      const response = await getUserData();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getUserBalance = createAsyncThunk(
    'balance/userBalance',
    async (user, { rejectWithValue }) => {
      try {
        const response = await getBalance();
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
    }
  );