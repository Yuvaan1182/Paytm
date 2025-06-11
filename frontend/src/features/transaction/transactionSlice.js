import { createSlice } from '@reduxjs/toolkit';
import { getUserTransactions } from '../thunks/thunks';
import { getWithExpiry, setWithExpiry } from '../utility/utility';

const initialState = {
  transactions: getWithExpiry('transactions') || [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserTransactions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        const transactions = action.payload.transactions;
        setWithExpiry('transactions', transactions, 1000 * 60 * 60); // 1 hour
        state.transactions = transactions;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
