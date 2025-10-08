import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/store";

export interface HiringPostPayload {
  project_uuid: string;
  title: string;
  description: string;
  type: string;
  experience: string;
  location: string;
  location_type: string;
  pay_range: string;
  link: string;
  status: string;
  is_published: boolean;
}

export interface HiringPost {
  id: number;
  uuid: string;
  user_uuid: string;
  project_uuid: string;
  title: string;
  description: string;
  type: string;
  experience: string;
  location: string;
  location_type: string;
  pay_range: string;
  link: string;
  status: string;
  is_published: boolean;
  created_at: string;
}

interface HiringState {
  loading: boolean;
  error: string | null;
  lastCreated?: any;
  data?: {
    title: "";
    description: "";
    type: "ONSITE";
    experience?: string;
    location?: "";
    location_type?: "";
    pay_range?: "";
    link?: "";
    status?: "ONGOING";
    is_published: true;
  };
  hiringPosts: HiringPost[];
  hiringPostItem?: HiringPost;
}

const initialState: HiringState = {
  loading: false,
  error: null,
  lastCreated: undefined,
  data: undefined,
  hiringPosts: [],
  hiringPostItem: undefined,
};

export const createHiring = createAsyncThunk<
  HiringPost,
  HiringPostPayload,
  { state: RootState; rejectValue: string }
>("hiring/createHiring", async (payload, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = (state as RootState).register?.token ?? null;

    const res = await axiosInstance.post("/v1/hire", payload, {
      headers: {
        "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
        "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to create event";
    return rejectWithValue(msg);
  }
});

export const fetchPublicHiring = createAsyncThunk(
  "hiring/fetchPublicHiring",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/v1/hire/public`);
      const data = response.data?.data.hires;

      console.log(data);
      return data;
    } catch (err: any) {
      console.error("fetchPublicHiring error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching public hiring"
      );
    }
  }
);

export const fetchHiringDetails = createAsyncThunk<
  HiringPost,
  { hire_uuid: string },
  { state: RootState }
>("hiring/fetchHiringDetails", async ({ hire_uuid }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/v1/hire/${hire_uuid}`);
    const data = response.data?.data.hire;
    console.log(data);
    return data;
  } catch (err: any) {
    console.error("fetchHireDetails error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error fetching hire details"
    );
  }
});

const eventsSlice = createSlice({
  name: "hiring",
  initialState,
  reducers: {
    clearHiringError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateForm(state, action: PayloadAction) {
      state.data = action.payload as HiringState["data"];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHiring.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.lastCreated = action.payload;
      })
      .addCase(createHiring.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create hire";
      })
      .addCase(fetchPublicHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicHiring.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.hiringPosts = action.payload;
      })
      .addCase(fetchPublicHiring.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch public hires";
      })
      .addCase(fetchHiringDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHiringDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.hiringPostItem = action.payload;
      })
      .addCase(fetchHiringDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch post details";
      });
  },
});

export const { clearHiringError, setLoading, updateForm } = eventsSlice.actions;
export default eventsSlice.reducer;
