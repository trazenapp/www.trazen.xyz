import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { PostState, FormType, Draft, Post } from "@/types/post.types";
import { RootState } from "@/redux/store";

const initialState: PostState = {
  loading: false,
  error: null,
  drafts: {
    feed: null,
    event: null,
    hiring: null,
    bounty: null,
  },
  data: {
    project_uuid: "",
    content: "",
    medias: [],
    is_published: false,
  },
};

export const createPost = createAsyncThunk<Post, { state: RootState }>(
  "post/createPost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post("/v1/post", payload, {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      console.error("createPost error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error creating post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    saveDraft: (state, action: PayloadAction<Draft>) => {
      const { type, data } = action.payload;
      state.drafts[type] = { type, data };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.data = {
        project_uuid: "",
        content: "",
        medias: [],
        is_published: false,
      };
      state.drafts.feed = null;
    },
    publishPost: (
      state,
      action: PayloadAction<{ type: FormType; data: Record<string, any> }>
    ) => {
      const { type, data } = action.payload;
      state.data = {
        project_uuid: data.project_uuid || "",
        content: data.content || "",
        medias: data.medias || [],
        is_published: data.is_published || false,
      };
      state.drafts[type] = null;
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
        state.data = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create post";
      });
  },
});

export const { saveDraft, publishPost, setLoading, resetForm } =
  postSlice.actions;
export default postSlice.reducer;
