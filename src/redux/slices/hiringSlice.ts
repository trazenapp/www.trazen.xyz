import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import type { RootState } from "@/src/redux/store";
import {
  HiringPostPayload,
  HiringPost,
  HiringState,
} from "@/src/types/hiring.types";

const initialState: HiringState = {
  loading: false,
  error: null,
  lastCreated: undefined,
  data: undefined,
  hiringPosts: [],
  pagination: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
  hasMore: false,
  hiringPostItem: undefined,
  bookmark: false,
};

export const bookmarkHiring = createAsyncThunk<
  any,
  { post_uuid: string },
  { state: RootState }
>(
  "hiring/bookmarkHiring",
  async ({ post_uuid }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/hire/bookmark/${post_uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Bookmark response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("bookmarkHiring error", err?.response?.data || err.message);
      return rejectWithValue(
        err?.response?.data?.message || "Error bookmarking hiring"
      );
    }
  }
);

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
      err?.response?.data?.message || err?.message || "Failed to create Hiring";
    return rejectWithValue(msg);
  }
});

export const fetchPublicHiring = createAsyncThunk(
  "hiring/fetchPublicHiring",
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const response = await axiosInstance.get(
        `/v1/hire/public?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = response.data?.data;
      console.log(data);
      return { hires: data.hires, pagination: data.pagination };
    } catch (err: any) {
      console.error("fetchPublicHiring error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching public hiring"
      );
    }
  }
);

export const fetchPrivateHiring = createAsyncThunk(
  "hiring/fetchPrivateHiring",
  async (
    { status, page, limit }: { status: string; page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const response = await axiosInstance.get(
        `/v1/hire/public?status=${status}&page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = response.data?.data;
      console.log(data);
      return { hires: data.hires, pagination: data.pagination };
    } catch (err: any) {
      console.error("fetchPrivateHiring error", err);
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

export const editHiring = createAsyncThunk(
  "post/editHiring",
  async (
    { data, hire_uuid }: { hire_uuid: string; data: HiringPostPayload },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.patch(
        `/v1/hire/${hire_uuid}`,
        data,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      console.error("editPost error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error editing post"
      );
    }
  }
);

export const deleteHiring = createAsyncThunk<
  string,
  string,
  { state: RootState } 
>("post/deleteHiring", async (hire_uuid, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = (state as RootState).register.token || null;

    const response = await axiosInstance.delete(`/v1/hire/${hire_uuid}`, {
      headers: {
        "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
        "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error("deleteHire error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error deleting hire"
    );
  }
});

const hiringSlice = createSlice({
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
      .addCase(
        fetchPublicHiring.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          const newPosts = action.payload.hires;
          const { pagination } = action.payload;

          if (pagination.page === 1) {
            state.hiringPosts = newPosts;
          } else {
            state.hiringPosts = [...state.hiringPosts, ...newPosts];
          }

          state.pagination = pagination;
          state.hasMore = pagination.page < pagination.totalPages;
        }
      )
      .addCase(fetchPublicHiring.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch public hires";
      })
      .addCase(fetchPrivateHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPrivateHiring.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          const newPosts = action.payload.hires;
          const { pagination } = action.payload;

          if (pagination.page === 1) {
            state.hiringPosts = newPosts;
          } else {
            state.hiringPosts = [...state.hiringPosts, ...newPosts];
          }

          state.pagination = pagination;
          state.hasMore = pagination.page < pagination.totalPages;
        }
      )
      .addCase(fetchPrivateHiring.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch public hires";
      })
      .addCase(fetchHiringDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHiringDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.hiringPostItem = action.payload;
        }
      )
      .addCase(fetchHiringDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch post details";
      })
      .addCase(bookmarkHiring.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        bookmarkHiring.fulfilled,
        (state, action: PayloadAction<any>) => {
          // state.loading = false;
          state.error = null;
          state.bookmark = action.payload;
        }
      )
      .addCase(bookmarkHiring.rejected, (state, action) => {
        // state.loading = false;
        state.error = (action.payload as string) || "Failed to bookmark hiring";
      })
      .addCase(editHiring.pending, (state) => {
        state.error = null;
      })
      .addCase(editHiring.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(editHiring.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to edit hiring";
      })
      .addCase(deleteHiring.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteHiring.fulfilled, (state, action) => {
        state.error = null;

        const deletedHiringUuid = action.payload;

        state.hiringPosts = state.hiringPosts.filter(
          (post) => post.uuid !== (deletedHiringUuid as string)
        );

        if (state.hiringPostItem?.uuid === (deletedHiringUuid as string)) {
          state.hiringPostItem = {} as HiringPost;
        }
      })
      .addCase(deleteHiring.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to delete hiring";
      });
  },
});

export const { clearHiringError, setLoading, updateForm } = hiringSlice.actions;
export default hiringSlice.reducer;
