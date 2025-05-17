import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegistration } from '../thunks/thunks';
import { getWithExpiry, removeLocalStorageItem, setWithExpiry } from '../utility/utility';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: !!getWithExpiry('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginWithToken: (state, action) => {
      const token = action.payload;
      setWithExpiry('token', token, 1000 * 60 * 60); // Save token with 1-hour expiry
      state.isAuthenticated = true;
    },
    logout: state => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      removeLocalStorageItem('user');
      removeLocalStorageItem('token');
      removeLocalStorageItem('balance');
      removeLocalStorageItem('theme');
      window.location.href = '/login';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const token = action.payload.token;
        setWithExpiry('token', token, 1000 * 60 * 60); // 1 hour
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed, please try again';
        state.isAuthenticated = false;
      })
      .addCase(userRegistration.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const token = action.payload?.token || null;
        /** Setting token in localStorage */
        if (token) {
          setWithExpiry('token', token, 1000 * 60 * 60); // 1 hour
        }

        state.isAuthenticated = true;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed, please try again';
        state.isAuthenticated = false;
      });
  },
});

export const { loginWithToken, logout } = authSlice.actions;

export default authSlice.reducer;
