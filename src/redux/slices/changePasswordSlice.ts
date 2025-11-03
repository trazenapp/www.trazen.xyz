import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordData {
  newPassword: string;
  currentPassword?: string;
}

export interface ChangePasswordState {
  loading: boolean;
  error: string | null;
  data: ChangePasswordData;
}

const formData: ChangePasswordData = {
  currentPassword: "",
  newPassword: "",
};

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
  data: formData,
};

export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordData
>("change-password", async (ChangePasswordData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<ChangePasswordResponse>(
      "/v1/user/password",
      ChangePasswordData,
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
      error.response?.data?.message || "Password Change Failed"
    );
  }
});

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<ChangePasswordData>) => {
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
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setLoading, resetForm } =
  changePasswordSlice.actions;

export default changePasswordSlice.reducer;
