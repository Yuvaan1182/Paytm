import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList } from '../thunks/thunks';

const payersSlice = createSlice({
  name: 'payers',
  initialState: {
    userList: [],
    loading: false,
    error: null,
    search: false,
  },
  reducers: {
    updateSearchState: (state, action) => {
      console.log('search state', action.payload);

      state.state = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserList.pending, state => {
        state.loading = true;
        state.error = null;
        state.search = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userList = action.payload.users;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'User Not Found';
        state.userList = [];
      });
  },
});
export const { updateSearchState } = payersSlice.actions;
export default payersSlice.reducer;
