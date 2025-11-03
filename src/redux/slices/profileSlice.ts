import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";

export interface ProfileData {
  email: string;
  username: string;
  avatar: string;
  title?: string;
  social?: string;
  skills: string[];
  interests?: string[];
  ref?: string;
}

export interface ProfileDataResponse {
  userProfile: ProfileData;
}

export interface ProfileResponse {
  message: string;
  data: {
    userProfile: ProfileData;
  };
}

export interface UpdateProfileResponse {
  message: string;
}

export interface ProfileState {
  loading: boolean;
  error: string | null;
  data: ProfileData;
}

const initialProfileData: ProfileData = {
  email: "",
  username: "",
  avatar: "",
  title: "",
  social: "",
  skills: [],
  interests: [],
  ref: "",
};

const initialState: ProfileState = {
  loading: false,
  error: null,
  data: initialProfileData,
};

export const getProfile = createAsyncThunk<ProfileResponse, void>(
  "get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        "/v1/user/profile",
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk<
  UpdateProfileResponse,
  ProfileData
>("update-profile", async (profileData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<UpdateProfileResponse>(
      "/v1/user/profile",
      profileData,
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update profile"
    );
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<ProfileData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.data = initialProfileData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.data.userProfile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setLoading, resetForm } =
  profileSlice.actions;

export default profileSlice.reducer;
