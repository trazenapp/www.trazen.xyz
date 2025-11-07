import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";
import {
  NotificationState,
  NotificationItem,
} from "@/src/types/notifications.types";
import { PostPagination } from "@/src/types/post.types";

const initialState: NotificationState = {
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  hasMore: true,
  notifications: [],
};

export const fetchNotifications = createAsyncThunk<
  { notifications: NotificationItem[]; pagination: PostPagination },
  { method: string; page: number; limit: number }
>(
  "notifications/fetchNotifications",
  async ({ method = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/v1/notification/user?method=${method}&page=${page}&limit=${limit}`
      );
      const data = response.data?.data;
      return { notifications: data.notifications, pagination: data.pagination };
    } catch (err: any) {
      console.error("fetchNotifications error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching notifications"
      );
    }
  }
);

export const fetchReadNotificationItem = createAsyncThunk<
  { notification: NotificationItem },
  { notification_uuid: string }
>(
  "notifications/fetchReadNotificationItem",
  async ({ notification_uuid }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/v1/notification/mark-as-read/${notification_uuid}`
      );
      const data = response.data?.data;
      const notification: NotificationItem = data?.notification ?? data;
      return { notification };
    } catch (err: any) {
      console.error("fetchReadNotificationItem error", err);
      return rejectWithValue(
        err?.response?.data?.message || "Error marking notification as read"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.notifications = [];
      state.pagination = { total: 0, page: 1, limit: 10, totalPages: 1 };
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<any>) => {
          const newNotifications = action.payload.notifications;
          const { pagination } = action.payload;

          if (pagination.page === 1) {
            state.notifications = newNotifications;
          } else {
            state.notifications = [...state.notifications, ...newNotifications];
          }

          state.pagination = pagination;
          state.hasMore = pagination.page < pagination.totalPages;
          state.loading = false;
        }
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      });
  },
});

export const { resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
