import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInState } from "@/types/auth.types";

const initialState: SignInState = {
  email: "",
  password: "",
  loading: false,
  error: null,
} 

const signInSlice = createSlice({
  name: "sign-in",
  initialState,
  reducers: {
    
  }
})