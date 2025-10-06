// src/redux/slices/eventsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/store";

export type CreateEventPayload = {
  project_uuid: string;
  title: string;
  description: string;
  cover_image?: string;
  status?: "ONGOING" | "UPCOMING" | "COMPLETED";
  start_time: string;
  end_time: string;
};

type EventsState = {
  loading: boolean;
  error: string | null;
  lastCreated?: any;
  data?: {
    title: "";
    description: "";
    cover_image?: string;
    status?: "ONGOING";
    start_time: string;
    end_time: string;
  };
};

const initialState: EventsState = {
  loading: false,
  error: null,
  lastCreated: undefined,
};

export const createEvent = createAsyncThunk<
  any,
  CreateEventPayload,
  { state: RootState; rejectValue: string }
>("events/createEvent", async (payload, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = (state as RootState).register?.token ?? null;

    const res = await axiosInstance.post("/v1/event", payload, {
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

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEventsError(state) {
      state.error = null;
    },
    clearLastCreated(state) {
      state.lastCreated = undefined;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateForm(state, action: PayloadAction) {
      state.data = action.payload as EventsState['data'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.lastCreated = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create event";
      });
  },
});

export const { clearEventsError, clearLastCreated, setLoading, updateForm } =
  eventsSlice.actions;
export default eventsSlice.reducer;
