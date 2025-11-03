import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import type { RootState } from "@/src/redux/store";
import type {
  BountyItem,
  BountiesState,
  BountyItemResponse,
} from "@/src/types/bounties.types";

const initialState: BountiesState = {
  loading: false,
  error: null,
  data: {
    project_uuid: "",
    title: "",
    description: "",
    duration: "",
    reward: "",
    link: "",
    status: "",
    is_published: false,
  },
  bountyData: [],
  bountyDetail: null,
  pagination: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
  hasMore: false,
};

export const createBounty = createAsyncThunk<
  BountyItem,
  BountyItem,
  { state: RootState; rejectValue: string }
>("bounties/createBounty", async (payload, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = (state as RootState).register?.token ?? null;

    const res = await axiosInstance.post("/v1/task", payload, {
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
      err?.response?.data?.message || err?.message || "Failed to create bounty";
    return rejectWithValue(msg);
  }
});

export const getBounties = createAsyncThunk(
  "bounties/getBounties",
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const res = await axiosInstance.get(
        `/v1/task/public?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = res.data.data;
      console.log(data);
      return { tasks: data.tasks, pagination: data.pagination };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to get bounties";
      return rejectWithValue(msg);
    }
  }
);

export const getBountiesPrivate = createAsyncThunk(
  "bounties/getBountiesPrivate",
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const res = await axiosInstance.get(
        `/v1/task/private?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = res.data.data;
      console.log(data);
      return { tasks: data.tasks, pagination: data.pagination };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to get bounties";
      return rejectWithValue(msg);
    }
  }
);

export const editBounties = createAsyncThunk(
  "post/editBounties",
  async (
    { data, task_uuid }: { task_uuid: string; data: BountyItem },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.patch(
        `/v1/task/${task_uuid}`,
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
      console.error("editBounties error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error editing bounty"
      );
    }
  }
);

export const deleteBounties = createAsyncThunk<
  string,
  string,
  { state: RootState } 
>("post/deleteBounties", async (task_uuid, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = (state as RootState).register.token || null;

    const response = await axiosInstance.delete(`/v1/task/${task_uuid}`, {
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

const bountiesSlice = createSlice({
  name: "bounties",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateForm: (state, action: PayloadAction<BountyItem>) => {
      state.data = action.payload;
    },
    resetForm: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBounty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createBounty.fulfilled,
        (state, action: PayloadAction<BountyItem>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(createBounty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBounties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBounties.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.tasks;
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.bountyData = newPosts;
        } else {
          state.bountyData = [...(state.bountyData || []), ...newPosts];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(getBounties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBountiesPrivate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBountiesPrivate.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.tasks;
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.bountyData = newPosts;
        } else {
          state.bountyData = [...(state.bountyData || []), ...newPosts];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(getBountiesPrivate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editBounties.pending, (state) => {
        state.error = null;
      })
      .addCase(editBounties.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(editBounties.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to edit bounties";
      })
      .addCase(deleteBounties.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteBounties.fulfilled, (state, action) => {
        state.error = null;

        const deletedBountiesUuid = action.payload;

        state.bountyData = state.bountyData?.filter(
          (post) => post.uuid !== (deletedBountiesUuid as string)
        );
      })
      .addCase(deleteBounties.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to delete bounties";
      });
  },
});

export default bountiesSlice.reducer;
export const { setLoading, updateForm, resetForm } = bountiesSlice.actions;
