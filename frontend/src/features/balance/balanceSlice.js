import { createSlice } from '@reduxjs/toolkit';
import { getWithExpiry, setWithExpiry } from '../utility/utility';
import { addToWallet, getUserBalance } from '../thunks/thunks';

const initialState = {
  balance: getWithExpiry('balance') || 0,
  success: false,
  loading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    updateSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const balance = action.payload.balance;
        setWithExpiry('balance', balance, 1000 * 60 * 60); // 1 hour
        state.balance = balance;
      })
      .addCase(getUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed!, getting account balance';
        state.isAuthenticated = false;
      })
      .addCase(addToWallet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Use backend response balance if available, else fallback to local calculation
        const backendBalance = action.payload && action.payload.balance;
        let newBalance;
        if (typeof backendBalance === 'number') {
          newBalance = backendBalance;
        } else {
          const amount = action.meta.arg.amount;
          newBalance = state.balance + amount;
        }
        setWithExpiry('balance', newBalance, 1000 * 60 * 60); // 1 hour
        state.balance = newBalance;
        state.success = true;
        state.error = null;
      })
      .addCase(addToWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed!, adding money to wallet';
      });
  },
});

export const { setBalance, updateSuccess } = balanceSlice.actions;
export default balanceSlice.reducer;
