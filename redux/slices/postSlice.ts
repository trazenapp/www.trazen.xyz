import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { PostState, FormType, Draft, Post, PostItem, PostPagination } from "@/types/post.types";
import { RootState } from "@/redux/store";

const initialState: PostState = {
  loading: false,
  error: null,
  drafts: {
    feed: null,
    events: null,
    hiring: null,
    bounties: null,
  },
  data: {
    project_uuid: "",
    content: "",
    medias: [],
    is_published: false,
  },
  pagination: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
  hasMore: false,
  publicPosts: [],
  privatePosts: [],
  postDetails: {} as PostItem,
  bookmark: false,
};

export const fetchPublicPosts = createAsyncThunk<
  { publicPosts: PostItem[]; pagination: PostPagination },
  { search: string; page: number; limit: number }
>("post/fetchPublicPosts", async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/v1/post/public?search=${search}&page=${page}&limit=${limit}`);
    const data = response.data?.data;
console.log(data);
    return { publicPosts: data.posts, pagination: data.pagination };
  } catch (err: any) {
    console.error("fetchPosts error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error fetching posts"
    );
  }
});

export const fetchPrivatePosts = createAsyncThunk<
  { privatePosts: PostItem[]; pagination: PostPagination },
  { page: number; limit: number }
>("post/fetchPrivatePosts", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/v1/post/private?status=status&page=${page}&limit=${limit}`);
    const data = response.data?.data;

    // console.log(data)
    return { privatePosts: data.posts, pagination: data.pagination };
  } catch (err: any) {
    console.error("fetchPosts error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error fetching posts"
    );
  }
});

export const fetchPostDetails = createAsyncThunk<
  PostItem,
  { post_uuid: string },
  { state: RootState }
>("post/fetchPostDetails", async ({ post_uuid }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/v1/post/${post_uuid}`);
    const data = response.data?.data.post;
    console.log(data);
    return data;
  } catch (err: any) {
    console.error("fetchPostDetails error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error fetching post details"
    );
  }
});

export const votePost = createAsyncThunk<any, { post_uuid: string; voteType: string },
  { state: RootState }>(
  "post/votePost",
  async ({ post_uuid, voteType }, { rejectWithValue, getState }) => {
    try {const state = getState();
    const token = (state as RootState).register.token || null;

    const response = await axiosInstance.post(`/v1/post/vote/${post_uuid}`, {voteType}, {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data
  } catch(err: any) {
    console.error("votePost error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error voting on post"
      );
  }
  }
)

export const commentOnPost = createAsyncThunk<
  any,
  { post_uuid: string; content: string },
  { state: RootState }
>(
  "post/commentOnPost",
  async ({ post_uuid, content }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/post/comment/${post_uuid}`,
        { content }, 
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("commentOnPost error", err?.response?.data || err.message);
      return rejectWithValue(
        err?.response?.data?.message || "Error commenting on post"
      );
    }
  }
);

export const voteOnComment = createAsyncThunk<
  any,
  { comment_uuid: string; voteType: string },
  { state: RootState }
>(
  "post/voteOnComment",
  async ({ comment_uuid, voteType }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/comment/vote/${comment_uuid}`,
        { voteType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      console.error("voteOnComment error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error creating post"
      );
    }
  }
);

export const commentOnComment = createAsyncThunk<any,
  { comment_uuid: string; content: string },
  { state: RootState }
>(
  "post/commentOnComment",
  async ({ comment_uuid, content }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/comment/comment/${comment_uuid}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      console.error("commentOnComment error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error commenting on comment"
      );
    }
  }
);

export const bookmarkPost = createAsyncThunk<
  any,
  { post_uuid: string },
  { state: RootState }
>(
  "post/bookmarkPost",
  async ({ post_uuid }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/post/bookmark/${post_uuid}`, 
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Bookmark response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("bookmarkPost error", err?.response?.data || err.message);
      return rejectWithValue(
        err?.response?.data?.message || "Error bookmarking post"
      );
    }
  }
);

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
      })
      .addCase(fetchPublicPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.publicPosts;
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.publicPosts = newPosts;
        } else {
          state.publicPosts = [...state.publicPosts, ...newPosts];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong";
      })
      .addCase(fetchPrivatePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivatePosts.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.privatePosts;
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.privatePosts = newPosts;
        } else {
          state.privatePosts = [...state.privatePosts, ...newPosts];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(fetchPrivatePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong";
      })
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetails = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong";
      })
      .addCase(bookmarkPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bookmark = action.payload;
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong";
      });
  },
});

export const { saveDraft, publishPost, setLoading, resetForm } =
  postSlice.actions;
export default postSlice.reducer;
