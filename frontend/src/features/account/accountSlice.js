import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transferFunds } from "../../apireq/accounts/account";
import { getUsers } from "../../apireq/user/user";
import { toast } from "react-toastify";

const initialState = {
  accountDetails: null,
  balance: 0,
  loading: false,
  error: null,
  userList: [],
};

export const updateBalance = createAsyncThunk(
  "account/updateBalance",
  async (transfer, { rejectWithValue }) => {
    try {
      const data = await transferFunds(transfer);
      return data;
    } catch (error) {
      
      return rejectWithValue(error.message || "Failed to update balance");
    }
  }
);

export const fetchUserList = createAsyncThunk(
  "account/fetchUserList",
  async (filter, { rejectWithValue }) => {
    try {
      const data = await getUsers(filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user list");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccountState: (state) => {
      state.accountDetails = null;
      state.balance = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.newBalance;
        toast.success("Money transfered successfully!");
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload.users;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAccountState } = accountSlice.actions;

export default accountSlice.reducer;