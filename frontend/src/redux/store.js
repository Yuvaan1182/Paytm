import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import anayticsReducer from '../features/analytics/analyticsSlice';
import authReducer from '../features/auth/authSlice';
import balanceReducer from '../features/balance/balanceSlice';
import payerReducer from '../features/payer/payerSlice';
import profileReducer from '../features/profile/profileSlice';
import progressReducer from '../features/progressbar/progressSlice';
import themeReducer from '../features/theme/themeSlice';
import uiReducer from '../features/ui/uiSlice';
import transactionsReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    payers: payerReducer,
    balance: balanceReducer,
    progress: progressReducer,
    profile: profileReducer,
    theme: themeReducer,
    ui: uiReducer,
    analytics: anayticsReducer,
    transactions: transactionsReducer,
  },
});
