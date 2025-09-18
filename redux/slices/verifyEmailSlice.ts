import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
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
>("verify-email/verify", async (VerifyEmailData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/v1/auth/verify-email",
      VerifyEmailData,
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
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
>("verify-email/resend", async (email, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/v1/auth/resend-email-verification",
      {email},
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error)
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
      })
      .addCase(resendEmailVerification.pending, (state) => {
        state.resendLoading = true;
        state.error = null;
      })
      .addCase(resendEmailVerification.fulfilled, (state) => {
        state.resendLoading = false;
        state.error = null;
      })
      .addCase(resendEmailVerification.rejected, (state, action) => {
        state.resendLoading = false;
        state.error = action.payload as string ?? "Resend Verification Failed";
      });
  },
});

export const {
  clearError,
  updateFormData,
  setLoading,
  resetForm,
  setResendLoading,
} = verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;
