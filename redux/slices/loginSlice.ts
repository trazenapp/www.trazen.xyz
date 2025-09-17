import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import { getMessaging, getToken } from "firebase/messaging";
import {
  SignInData,
  SignInResponse,
  User,
  SignInState,
} from "@/types/auth.types";

const formData: SignInData = {
  email: "",
  password: "",
};

const initialState: SignInState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  data: formData,
};
// /app/api/auth/set-token/route.ts
export const signIn = createAsyncThunk<SignInResponse, SignInData>(
  "sign-in",
  async (SignInData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SignInResponse>(
        "/v1/auth/login",
        SignInData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            "x-device-token": localStorage.getItem("fcmToken"),
          },
        }
      );
      console.log(response.data.data)
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
      }

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.data.data.token }),
      });

      return response.data;
    } catch (error: any) {
      console.log("Sign In Error: ", error);
      return rejectWithValue(error.response?.data?.message || "Sign In Failed");
    }
  }
);

const loginSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateFormData: (state, action: PayloadAction<SignInData>) => {
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
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, updateFormData, setLoading, resetForm } =
  loginSlice.actions;

export default loginSlice.reducer;
