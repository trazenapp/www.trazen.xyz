import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import {
  ResetPasswordState,
  ForgotPasswordResponse,
  User,
  ResetPasswordData,
} from "@/src/types/auth.types";

const formData: ResetPasswordData = {
  email: "",
  password: "",
  cPassword: "",
  token: "",
};

const initialState: ResetPasswordState = {
  loading: false,
  error: null,
  data: formData,
};

export const resetPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ResetPasswordData
>("reset-password", async (ResetPasswordData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put<ForgotPasswordResponse>(
      "/v1/auth/reset-forgot-password",
      ResetPasswordData,
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
    // console.log(response.data.message)
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Reset Password Failed"
    );
  }
});

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<ResetPasswordData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.data = formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setLoading, resetForm } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
