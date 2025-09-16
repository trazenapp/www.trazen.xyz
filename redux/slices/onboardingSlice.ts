import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SignUpResponse,
  OnboardingState,
  SignUpData,
  SignInResponse,
  OnboardingData,
  SignInData,
} from "@/types/auth.types";

const formData: OnboardingData = {
  username: "",
  xHandle: "",
  title: "",
  skills: [],
  hearAboutUs: "",
  chains: [],
  niche: "",
  projects: "",
};

const initialState: OnboardingState = {
  loading: false,
  error: null,
  steps: 1,
  data: formData,
};

export const signIn = createAsyncThunk<SignInResponse, SignInData>(
  "sign-in",
  async (SignInData, { rejectWithValue }) => {
    try {
      const response = await axios.post<SignInResponse>(
        "/v1/auth/login",
        SignInData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            "x-device-token": "1"
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Sign Up Failed");
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<SignUpData>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(onboarding.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(onboarding.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload.user;
  //       state.isAuthenticated = true;
  //       state.error = null;
  //     })
  //     .addCase(onboarding.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload as string;
  //       state.isAuthenticated = false;
  //     });
  // },
});

export const {
  clearError,
  updateFormData,
  setSteps,
  setLoading,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
