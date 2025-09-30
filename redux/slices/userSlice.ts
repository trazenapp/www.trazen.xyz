// src/redux/slices/profileSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { UserProfile } from "@/types/user.types";

type ProfileState = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<UserProfile>(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/user/profile");
      console.log(response.data.data);
      return response.data.data.userProfile;
    } catch (err: any) {
      console.error("get user profile error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error getting user profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
