import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userSignup, userSignin } from '../../apireq/user/user';
import { getWithExpiry, removeLocalStorageItem, setWithExpiry } from '../utility/utility';
import { setBalance } from '../balance/balanceSlice';

const initialState = {
  userInfo: getWithExpiry('user'),
  loading: false,
  error: null,
  isAuthenticated: !!getWithExpiry('token'),
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const response = await userSignup(user);

      const balance = response?.balance || 0;
      dispatch(setBalance(balance)); // Update balance state
      setWithExpiry('balance', balance, 1000 * 60 * 60); // 1 hour
      return response;
    } catch (error) {
      console.log('Error during signup:', error);
      return rejectWithValue(error?.message || 'SignUp failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const response = await userSignin(user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const balance = response?.balance || 0;
      dispatch(setBalance(balance)); // Update balance state
      setWithExpiry('balance', balance, 1000 * 60 * 60); // 1 hour
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.userInfo = null;
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
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const user = {
          email: action.payload.user?.email,
          firstName: action.payload.user?.firstName,
          lastName: action.payload.user?.lastName,
        };
        setWithExpiry('user', user, 1000 * 60 * 60); // 1 hour

        const token = action.payload.token;
        setWithExpiry('token', token, 1000 * 60 * 60); // 1 hour

        state.userInfo = user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed, please try again';
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        /** Creating a user object with user info email, firstName, lastName */
        const user = action.meta.arg;

        /** Remove password from user object */
        delete user?.password;

        /** Setting user info in state */
        setWithExpiry('user', user, 1000 * 60 * 60); // 1 hour

        const token = action.payload?.token || null;
        /** Setting token in localStorage */
        if (token) {
          setWithExpiry('token', token, 1000 * 60 * 60); // 1 hour
        }

        state.userInfo = user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed, please try again';
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
