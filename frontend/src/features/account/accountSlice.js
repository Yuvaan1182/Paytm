import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transferFunds } from "../../apireq/accounts/account";
import { toast } from "react-toastify";
import { setBalance } from "../balance/balanceSlice";
import { setWithExpiry } from "../utility/utility";
import { errorHandler } from "../../components/ErrorHandler";

const initialState = {
  accountDetails: null,
  loading: false,
  error: null,
};

export const updateBalance = createAsyncThunk(
  "account/updateBalance",
  async (transfer, { rejectWithValue, dispatch }) => {
    try {
      const data = await transferFunds(transfer);
      // Update balance state
      dispatch(setBalance(data.balance)); 
      setWithExpiry ("balance", data.balance, 1000 * 60 * 60); // 1 hour
      return data;
    } catch (error) {
      errorHandler(error);
      return rejectWithValue(error.message || "Failed to update balance");
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
        const amount = action.meta.arg.amount;
        toast.success(`${amount}$ Transfered Successfully!`);
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        errorHandler(action.payload || "Failed to transfer funds");
      })
  },
});

export const { resetAccountState } = accountSlice.actions;

export default accountSlice.reducer;