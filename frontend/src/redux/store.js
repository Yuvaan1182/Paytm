import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    account: accountReducer,
  },
});