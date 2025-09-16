import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ForgotPasswordState,
  ForgotPasswordResponse,
  ForgotPasswordData,
} from "@/types/auth.types";

const data: ForgotPasswordData = {
  email: "",
};

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  data: data,
};

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordData
>("forgot-password", async (ForgotPasswordData, { rejectWithValue }) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      "/v1/auth/forgot-password",
      ForgotPasswordData,
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Forgot Password Failed"
    );
  }
});

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<ForgotPasswordData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.data = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setLoading, resetForm } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
