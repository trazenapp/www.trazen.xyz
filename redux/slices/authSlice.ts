// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import {
//   SignUpResponse,
//   AuthState,
//   SignUpData,
//   SignInResponse,
//   OnboardingData,
//   SignInData,
//   User,
// } from "@/types/auth.types";

// const formData: SignUpData = {
//   role: "USER",
//   email: "",
//   password: "",
// };

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   steps: 1,
//   data: formData,
// };

// export const signUp = createAsyncThunk<SignUpResponse, SignUpData>(
//   "sign-up",
//   async (SignUpData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<SignUpResponse>(
//         "/v1/auth/register",
//         SignUpData,
//         {
//           headers: {
//             "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
//             "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
//           },
//         }
//       );

//       // if (response.data.token) {
//       //   localStorage.setItem("token", response.data.token);
//       // }

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Sign Up Failed");
//     }
//   }
// );

// export const signIn = createAsyncThunk<SignInResponse, SignInData>(
//   "sign-in",
//   async (SignInData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<SignInResponse>(
//         "/v1/auth/login",
//         SignInData,
//         {
//           headers: {
//             "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
//             "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
//             "x-device-token": "1"
//           },
//         }
//       );

//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//       }

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Sign Up Failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "signUp",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
//     setUser: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     updateFormData: (state, action: PayloadAction<SignUpData>) => {
//       state.data = { ...state.data, ...action.payload };
//     },
//     setSteps: (state, action: PayloadAction<number>) => {
//       state.steps = action.payload;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signUp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const {
//   clearError,
//   logout,
//   setUser,
//   updateFormData,
//   setSteps,
//   setLoading,
// } = authSlice.actions;

// export default authSlice.reducer;
