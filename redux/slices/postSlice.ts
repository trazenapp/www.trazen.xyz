// src/redux/slices/postSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { Post } from "@/types/post.types";

interface PostState {
  loading: boolean;
  error: string | null;
  lastCreated?: Post | null;
}

const initialState: PostState = {
  loading: false,
  error: null,
  lastCreated: null,
};

export const createPost = createAsyncThunk("post/createPost", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/v1/post", payload);
    console.log(response.data.data);
    return response.data.data;
  } catch (err: any) {
    console.error("createPost error", err);
    return rejectWithValue(err?.response?.data?.message || "Error creating post");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostError(state) {
      state.error = null;
    },
    clearLastCreated(state) {
      state.lastCreated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastCreated = action.payload.data;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create post";
      });
  },
});

export const { clearPostError, clearLastCreated } = postSlice.actions;
export default postSlice.reducer;
