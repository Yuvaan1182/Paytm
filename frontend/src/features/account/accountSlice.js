import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { errorHandler } from '../../components/ErrorHandler';
import { updateBalance } from '../thunks/thunks';

const initialState = {
  accountDetails: null,
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountState: state => {
      state.accountDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.loading = false;
        const amount = action.meta.arg.amount;
        toast.success(`${amount} ₹ Transfered Successfully!`);
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        errorHandler(action.payload || 'Failed to transfer funds');
      });
  },
});

export const { resetAccountState } = accountSlice.actions;

export default accountSlice.reducer;
