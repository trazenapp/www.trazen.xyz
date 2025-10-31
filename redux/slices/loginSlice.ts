import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { getMessaging, getToken } from "firebase/messaging";
import {
  SignInData,
  SignInWalletData,
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
  token: null,
};

// /app/api/auth/set-token/route.ts
export const signIn = createAsyncThunk(
  "sign-in",
  async (SignInData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/v1/auth/login", SignInData, {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          "x-device-token": localStorage.getItem("fcmToken"),
        },
      });

      const { user, token } = response.data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      return { user, token };
    } catch (error: any) {
      console.log("Sign In Error: ", error);
      return rejectWithValue(error.response?.data?.message || "Sign In Failed");
    }
  }
);

export const signInWithWallet = createAsyncThunk(
  "sign-in-with-wallet",
  async (SignInWalletData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/v1/auth/wallet",
        SignInWalletData,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            "x-device-token": localStorage.getItem("fcmToken"),
          },
        }
      );

      const { user, token } = response.data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Sign In Failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (_, { dispatch }) => {
    await fetch("api/auth/logout", { method: "POST" });
    dispatch(logout());
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
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
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
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(signInWithWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(signInWithWallet.rejected, (state, action) => {
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
  setLoading,
  resetForm,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;
