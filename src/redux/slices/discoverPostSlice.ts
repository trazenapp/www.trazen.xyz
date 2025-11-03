import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import { UserProfile } from "@/src/types/user.types";
import { PostItem } from "@/src/types/post.types";
import { ProjectDetail } from "@/src/types/project.types";

interface DiscoverPostResponse {
  status: number;
  success: boolean;
  data: {
    posts: PostItem[];
  };
}

interface DiscoverPostData {
  page: number;
  limit: number;
  query?: string;
}

interface User extends UserProfile {
  avatar: string | null;
  status: string;
}

interface Profile extends ProjectDetail {
  user: User;
  follower: { uuid: string }[];
  status: string;
}

interface PostState {
  data: PostItem[];
  query: string;
  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  data: [],
  query: "",
  page: 1,
  limit: 20,
  hasMore: true,
  loading: false,
  error: null,
};

export const discoverPost = createAsyncThunk<
  DiscoverPostResponse,
  DiscoverPostData
>("discover-post", async (DiscoverPostData, { rejectWithValue }) => {
  try {
    const { page, limit, query } = DiscoverPostData;
    const response = await axiosInstance.get<DiscoverPostResponse>(
      `/v1/post/public?search=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(
      error.response?.data?.message || "Error fetching discover posts"
    );
  }
});

const discoverPostSlice = createSlice({
  name: "discoverPost",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetDiscoverPosts: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(discoverPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        discoverPost.fulfilled,
        (state, action: PayloadAction<DiscoverPostResponse>) => {
          state.loading = false;
          const newPosts = action.payload.data.posts;

          const existingIds = new Set(state.data.map((post) => post.uuid));
          const uniqueNewPosts = newPosts.filter(
            (post) => !existingIds.has(post.uuid)
          );

          if (newPosts.length < state.limit) {
            state.hasMore = false;
          }

          state.data = [...state.data, ...uniqueNewPosts];
          state.page += 1;
        }
      )
      .addCase(discoverPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading, setQuery, resetDiscoverPosts } =
  discoverPostSlice.actions;
export default discoverPostSlice.reducer;
