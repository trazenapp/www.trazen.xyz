// src/redux/slices/eventsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/store";
import type {
  EventsState,
  CreateEventPayload,
  EventsItem,
} from "@/types/event.types";

const formData = {
  title: "",
  description: "",
  cover_image: "",
  status: "ONGOING",
  date_time: "",
  type: "ONSITE",
  location: "",
};

const initialState: EventsState = {
  loading: false,
  error: null,
  lastCreated: undefined,
  // data: formData,
  events: [],
  pagination: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
  hasMore: false,
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

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const res = await axiosInstance.get(
        `/v1/event/public?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = res.data?.data;
      return { events: data.events, pagination: data.pagination };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to get events";
      return rejectWithValue(msg);
    }
  }
);

export const getEventsPrivate = createAsyncThunk(
  "events/getEventsPrivate",
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register?.token ?? null;

      const res = await axiosInstance.get(
        `/v1/event/private?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY ?? "",
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY ?? "",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = res.data?.data;
      return { events: data.events, pagination: data.pagination };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to get events";
      return rejectWithValue(msg);
    }
  }
);

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
      state.data = action.payload as EventsState["data"];
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
      })
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newEvents = (state.events = action.payload.events);
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.events = newEvents;
        } else {
          state.events = [...(state.events || []), ...(newEvents || [])];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to get events";
      })
      .addCase(getEventsPrivate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventsPrivate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newEvents = (state.events = action.payload.events);
        const { pagination } = action.payload;

        if (pagination.page === 1) {
          state.events = newEvents;
        } else {
          state.events = [...(state.events || []), ...(newEvents || [])];
        }

        state.pagination = pagination;
        state.hasMore = pagination.page < pagination.totalPages;
      })
      .addCase(getEventsPrivate.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to get events";
      });
  },
});

export const { clearEventsError, clearLastCreated, setLoading, updateForm } =
  eventsSlice.actions;
export default eventsSlice.reducer;
