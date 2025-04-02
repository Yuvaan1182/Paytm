import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../apireq/user/user";
import { createSlice } from "@reduxjs/toolkit";

export const fetchUserList = createAsyncThunk(
  "account/fetchUserList",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await getUsers(filter);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user list");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    userList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userList = action.payload.users;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "User Not Found";
        state.userList = [];
      });
  },
});

export default dashboardSlice.reducer;
