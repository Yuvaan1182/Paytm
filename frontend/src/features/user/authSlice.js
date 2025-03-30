import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSignup } from "../../apireq/user/user";

const initialState = {
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      console.log(user);

      const response = await userSignup(user);
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
