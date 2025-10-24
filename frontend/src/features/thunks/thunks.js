import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMoneyToWallet, transferFunds } from '../../apireq/accounts/account';
import { getUserAnalyticsSummary } from '../../apireq/analytics/analytics';
import { getTransactionHistory } from '../../apireq/transactions/transactions';
import { getBalance, getUserData, getUsers, userSignin, userSignup } from '../../apireq/user/user';
import { errorHandler } from '../../components/ErrorHandler';

export const userRegistration = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await userSignup(user);

      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Signup Failed';
      errorHandler(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const userLogin = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await userSignin(user);
    return response;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Login failed';
    errorHandler(errMsg);
    return rejectWithValue(errMsg);
  }
});

export const userProfile = createAsyncThunk(
  'profile/profile',
  async (user, { rejectWithValue }) => {
    try {
      const response = await getUserData();
      console.log('user Profile thunk');

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

export const fetchUserList = createAsyncThunk(
  'account/fetchUserList',
  async (filter, { rejectWithValue }) => {
    try {
      const response = await getUsers(filter);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user list');
    }
  }
);

export const updateBalance = createAsyncThunk(
  'account/updateBalance',
  async (transfer, { rejectWithValue }) => {
    try {
      const data = await transferFunds(transfer);
      return data;
    } catch (error) {
      errorHandler(error);
      return rejectWithValue(error.message || 'Failed to update balance');
    }
  }
);

export const getSummary = createAsyncThunk(
  'analytics/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserAnalyticsSummary();
      return data;
    } catch (error) {
      errorHandler(error);
      return rejectWithValue(error.message || 'Failed to update balance');
    }
  }
);

export const getUserTransactions = createAsyncThunk(
  'transactions/getUserTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTransactionHistory();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }
);

export const addToWallet = createAsyncThunk(
  'account/addToWallet',
  async (transfer, { rejectWithValue }) => {
    try {
      const data = await addMoneyToWallet(transfer);
      return data;
    } catch (error) {
      errorHandler(error);
      return rejectWithValue(error.message || 'Failed to add to wallet');
    }
  }
);
