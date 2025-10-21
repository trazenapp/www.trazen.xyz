import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { DashboardState, FollowersData } from "@/types/dashboard.types";

const initialState: DashboardState = {
  loading: false,
    followers: {
      OverviewCount: 0,
      chart: [],
      project: [],
    },
  error: null,
};

export const fetchProjectOverview = createAsyncThunk<
  FollowersData,
  { uuid: string; month: number; year: number },
  { rejectValue: string }
>(
  "dashboard/fetchProjectOverview",
  async ({ uuid, month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/v1/pioneer/overView/${uuid}?month=${month}&year=${year}`
      );

      console.log(response.data);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching project overview"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectOverview.fulfilled, (state, action: PayloadAction<FollowersData>) => {
        state.loading = false;
        state.error = null;
        state.followers = action.payload;
      })
      .addCase(fetchProjectOverview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch project overview";
      });
  },
});

export default dashboardSlice.reducer;
