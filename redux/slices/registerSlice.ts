import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import {
  SignUpResponse,
  SignUpState,
  SignUpData,
  User,
} from "@/types/auth.types";

const formData: SignUpData = {
  role: "USER",
  email: "",
  password: "",
  cPassword: "",
};

const initialState: SignUpState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  steps: 1,
  formData: formData,
};

export const signUp = createAsyncThunk<User, SignUpData>(
  "sign-up",
  async (SignUpData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SignUpResponse>(
        "/v1/auth/register",
        SignUpData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      console.log(error.response?.statusText);
      return rejectWithValue("Sign Up Failed");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateFormData: (state, action: PayloadAction<SignUpData>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.formData = formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const {
  clearError,
  setUser,
  updateFormData,
  setSteps,
  setLoading,
  resetForm,
} = registerSlice.actions;

export default registerSlice.reducer;
