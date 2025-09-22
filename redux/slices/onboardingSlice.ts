import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import {
  OnboardingState,
  SignUpData,
  SignInResponse,
  OnboardingData,
} from "@/types/auth.types";

const formData: OnboardingData = {
  email: "",
  username: "",
  social: "",
  title: "",
  skills: [],
  hearAboutUs: "",
  interests: [],
  niche: [],
  projects: "",
  chains: [],
};

const initialState: OnboardingState = {
  loading: false,
  error: null,
  steps: 1,
  data: formData,
};

export const onboarding = createAsyncThunk<SignInResponse, OnboardingData>(
  "onboarding/updateProfile",
  async (OnboardingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<SignInResponse>(
        "/v1/user/profile",
        OnboardingData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Profile Update Failed");
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
    updateFormData: (state, action: PayloadAction<OnboardingData>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onboarding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onboarding.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(onboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setSteps, setLoading } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
