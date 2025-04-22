import { createSlice } from '@reduxjs/toolkit';
import { getWithExpiry } from '../utility/utility';

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
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
