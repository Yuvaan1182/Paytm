import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    value: 0,
    done: false,
  },
  reducers: {
    incrementProgress: state => {
      if (state.value < 100) {
        state.value += 1;
      }
    },
    setDone: (state, action) => {
      state.done = action.payload;
    },
  },
});

export const { incrementProgress, setDone } = progressSlice.actions;
export default progressSlice.reducer;
