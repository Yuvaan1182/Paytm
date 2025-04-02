import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/account/accountSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import balanceReducer from '../features/balance/balanceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    dashboard: dashboardReducer,
    balance: balanceReducer,
  },
});