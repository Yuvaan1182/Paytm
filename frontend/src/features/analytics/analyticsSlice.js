import { createSlice } from '@reduxjs/toolkit';
import { getSummary } from '../thunks/thunks';
import { getWithExpiry, setWithExpiry } from '../utility/utility';

const initialState = {
  summary: getWithExpiry('summary') || [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSummary.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        const summary = action.payload;
        setWithExpiry('summary', summary, 1000 * 60 * 60); // 1 hour
        state.summary = summary;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAccountState, setAccountSummary } = analyticsSlice.actions;

export default analyticsSlice.reducer;
