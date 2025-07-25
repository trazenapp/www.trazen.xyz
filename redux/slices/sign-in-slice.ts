import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

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