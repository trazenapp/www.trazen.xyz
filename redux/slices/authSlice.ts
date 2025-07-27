import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpResponse, SignUpState, SignUpData, User } from "@/types/auth.types";

const initialState: SignUpState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}  

export const signUp = createAsyncThunk<SignUpResponse, SignUpData>(
  "sign-up",
  async (SignUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post<SignUpResponse>("/v1/auth/register", SignUpData);

      if(response.data.token) {
        localStorage.setItem("token", response.data.token)
      }

      return response.data
    } catch (error: any) {
      return rejectWithValue (
        error.response?.data?.message || "Sign Up Failed"
      )
    }
  }
);

const authSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
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
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action)=> {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
  },
});

export const { clearError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
