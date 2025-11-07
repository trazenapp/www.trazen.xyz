import { PostPagination } from "./post.types";

export interface NotificationItem {
  id: number;
  uuid: string;
  user_uuid: string;
  project_uuid: string | null;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationState {
  loading: boolean;
    error: string | null;
    pagination: PostPagination;
    hasMore: boolean;
    notifications: NotificationItem[];
}