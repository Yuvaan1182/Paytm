import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSignup, userSignin } from "../../apireq/user/user";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("user"),
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      console.log(user);

      const response = await userSignup(user);
      return response;
    } catch (error) {
      console.log("Error during signup:", error);
      return rejectWithValue(error?.message || "SignUp failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await userSignin(user); // Replace with your login API function
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    users: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        const user = {
          email: action.payload.user?.email,
          firstName: action.payload.user?.firstName,
          lastName: action.payload.user?.lastName,
          token: action.payload.token,
          balance: action.payload.balance,
        };
        state.userInfo = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "action patyload");
        if (!action.payload?.token) {
          state.error = action.payload?.message || "Registration failed";
          return;
        }
        const user = action.meta.arg;
        delete user?.password; // Remove password from user object
        user.token = action.payload?.token;
        user.balance = action.payload?.balance;
        localStorage.setItem("user", JSON.stringify(user)); // Store payload in localStorage
        state.userInfo = user;        
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.payload, "error");
        state.loading = false;
        state.error = action.payload || "Registration failed, please try again";
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
