import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";
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
  token: null,
};

export const signUp = createAsyncThunk(
  "sign-up",
  async (SignUpData: SignUpData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/v1/auth/register",
        SignUpData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          },
        }
      );

      const { user, token } = response.data.data;
      localStorage.setItem("token", token);

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      
      return { user, token };
    } catch (error: any) {
      console.log(error?.message);
      return rejectWithValue(error?.message || "Sign Up Failed");
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
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  updateFormData,
  setSteps,
  setLoading,
  resetForm,
  logout
} = registerSlice.actions;

export default registerSlice.reducer;
