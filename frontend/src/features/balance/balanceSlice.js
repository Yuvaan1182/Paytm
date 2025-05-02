import { createSlice } from '@reduxjs/toolkit';
import { getWithExpiry, setWithExpiry } from '../utility/utility';
import { getUserBalance } from '../thunks/thunks';

const initialState = {
  balance: getWithExpiry('balance') || 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
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
        });
      },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
