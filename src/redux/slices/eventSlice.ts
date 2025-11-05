// src/redux/slices/eventsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import type { RootState } from "@/src/redux/store";
import type {
  EventsState,
  CreateEventPayload,
  EventsItem,
} from "@/src/types/event.types";
import { ReportItem } from "@/src/types/post.types";

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
  reportData: {
    reason: "SCAM",
    details: "",
  },
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
      console.log("Fetched events:", data.events);
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

export const editEvents = createAsyncThunk(
  "post/editEvents",
  async (
    { data, event_uuid }: { event_uuid: string; data: EventsItem },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.patch(
        `/v1/event/${event_uuid}`,
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
      console.error("editEvent error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error editing event"
      );
    }
  }
);

export const reportPost = createAsyncThunk(
  "post/reportPost",
  async (
    { data, post_uuid }: { post_uuid: string; data: ReportItem },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const token = (state as RootState).register.token || null;

      const response = await axiosInstance.post(
        `/v1/event/report/${post_uuid}`,
        data,
        {
          headers: {
            "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
            "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Follow response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("reportPost error", err?.response?.data || err.message);
      return rejectWithValue(
        err?.response?.data?.message || "Error reporting project"
      );
    }
  }
);

export const deleteEvents = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("post/deleteEvents", async (event_uuid, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = (state as RootState).register.token || null;

    const response = await axiosInstance.delete(`/v1/event/${event_uuid}`, {
      headers: {
        "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
        "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error("deleteEvent error", err);
    return rejectWithValue(
      err?.response?.data?.message || "Error deleting event"
    );
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
      })
      .addCase(editEvents.pending, (state) => {
        state.error = null;
      })
      .addCase(editEvents.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(editEvents.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to edit events";
      })
      .addCase(deleteEvents.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteEvents.fulfilled, (state, action) => {
        state.error = null;

        const deletedEventsUuid = action.payload;

        state.events = state.events?.filter(
          (post) => post.uuid !== (deletedEventsUuid as string)
        );
      })
      .addCase(deleteEvents.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to delete bounties";
      });
  },
});

export const { clearEventsError, clearLastCreated, setLoading, updateForm } =
  eventsSlice.actions;
export default eventsSlice.reducer;
