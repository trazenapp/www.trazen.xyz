import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/store";
import type { BountyItem, BountiesState, BountyItemResponse } from "@/types/bounties.types";

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

export const getBounties = createAsyncThunk<
  BountyItemResponse[],
  void,
  { state: RootState; rejectValue: string }
>("bounties/getBounties", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = (state as RootState).register?.token ?? null;

    const res = await axiosInstance.get("/v1/task/public", {
      headers: {
        "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
        "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res.data.data.tasks as BountyItemResponse[];
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to get bounties";
    return rejectWithValue(msg);
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
      .addCase(getBounties.fulfilled, (state, action: PayloadAction<BountyItemResponse[]>) => {
          state.loading = false;
          state.bountyData = action.payload;
        }
      )
      .addCase(getBounties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bountiesSlice.reducer;
export const { setLoading, updateForm, resetForm } = bountiesSlice.actions;
