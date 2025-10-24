import { getWithExpiry, setWithExpiry } from '../utility/utility';
import { userProfile } from '../thunks/thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: getWithExpiry('user'),
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log('profile payload', action.payload);
        const user = {
          email: action.payload.data?.email,
          firstName: action.payload.data?.firstName,
          lastName: action.payload.data?.lastName,
        };
        setWithExpiry('user', user, 1000 * 60 * 60); // 1 hour
        state.user = user;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed getting User Data, please try again';
      });
  },
});

export default profileSlice.reducer;
