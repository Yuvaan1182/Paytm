import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/account/accountSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import balanceReducer from '../features/balance/balanceSlice';
import progressReducer from '../features/progressbar/progressSlice';
import themeReducer from '../features/theme/themeSlice';
import uiReducer from '../features/ui/uiSlice';
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    dashboard: dashboardReducer,
    balance: balanceReducer,
    progress: progressReducer,
    profile: profileReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});
