import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  EmailVerificationState,
  ForgotPasswordResponse,
  VerifyEmailData,
} from "@/types/auth.types";

const formData: VerifyEmailData = {
  email: "",
  token: "",
};

const initialState: EmailVerificationState = {
  loading: false,
  resendLoading: false,
  error: null,
  data: formData,
};

export const verifyEmail = createAsyncThunk<
  ForgotPasswordResponse,
  VerifyEmailData
>("verify-email", async (VerifyEmailData, { rejectWithValue }) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      "/v1/auth/verify-email",
      VerifyEmailData,
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
      error.response?.data?.message || "Email Verification Failed"
    );
  }
});

export const resendEmailVerification = createAsyncThunk<
  ForgotPasswordResponse,
  string
>("verify-email", async (resendEmailData, { rejectWithValue }) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      "/v1/auth/resend-email-verification",
      resendEmailData,
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
      error.response?.data?.message || "Email Verification Token Resend Failed"
    );
  }
});

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<VerifyEmailData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setResendLoading: (state, action: PayloadAction<boolean>) => {
      state.resendLoading = action.payload;
    },
    resetForm: (state) => {
      state.data = formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setLoading, resetForm, setResendLoading } =
  verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;
