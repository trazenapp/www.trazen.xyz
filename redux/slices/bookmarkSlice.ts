import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/store";

interface BookmarkState {
  loading: boolean;
  error: string | null;
  lastCreated: any | undefined;
  // data: undefined,
  bookmark: [],
}

const initialState: BookmarkState = {
  loading: false,
  error: null,
  lastCreated: undefined,
  // data: undefined,
  bookmark: [],
};

export const fetchBookmark = createAsyncThunk(
  "bookmark/fetchBookmark",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/v1/bookmark`);
      const data = response.data?.data.bookmarks;

      console.log(data);
      return data;
    } catch (err: any) {
      console.error("fetchBookmark error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching public bookmark"
      );
    }
  }
);

export const fetchBookmarkDetails = createAsyncThunk<
  any,
  { bookmark_uuid: string },
  { state: RootState }
>("hiring/fetchBookmarkDetails", async ({ bookmark_uuid }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/v1/bookmark/${bookmark_uuid}`);
    const data = response.data?.data.bookmark;
    console.log(data);
    return data;
  } catch (err: any) {
    console.error("fetchBookmarkDetails error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error fetching bookmark details"
    );
  }
});

export const deleteBookmark = createAsyncThunk<
  any,
  { bookmark_uuid: string },
  { state: RootState }
>("bookmark/deleteBookmark", async ({ bookmark_uuid }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/v1/bookmark/${bookmark_uuid}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err: any) {
    console.error("deleteBookmark error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error deleting bookmark"
    );
  }
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    clearBookmarkError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmark.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.bookmark = action.payload as any;
        state.error = null;
        state.lastCreated = action.payload;
      })
      .addCase(fetchBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch bookmark";
      })
      .addCase(fetchBookmarkDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarkDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.lastCreated = action.payload;
      })
      .addCase(fetchBookmarkDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch bookmark details";
      });
  },
});

export const { clearBookmarkError, setLoading } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
