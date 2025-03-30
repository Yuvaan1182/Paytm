import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSignup } from "../../apireq/user/user";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuthenticated: false,
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
        console.log(action.payload, "action patyload");
        if (!action.payload?.token) {
          state.error = action.payload?.message || "Registration failed";
          return;
        }
        const user = action.meta.arg;
        delete user?.password; // Remove password from user object
        user.token = action.payload?.token;
        localStorage.setItem("user", JSON.stringify(user)); // Store payload in localStorage
        state.userInfo = { user };
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
