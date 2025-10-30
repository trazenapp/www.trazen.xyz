import { ProjectDetail } from "@/types/project.types";
import { PostPagination, ReportItem } from "@/types/post.types";

export interface CreateEventPayload {
  project_uuid: string;
  title: string;
  description: string;
  cover_image?: string;
  status?: "ONGOING" | "UPCOMING" | "COMPLETED";
  date_time: string;
  type: "ONSITE" | "VIRTUAL" | "HYBRID";
  location?: string;
  is_published: boolean;
}

export interface EventsItem {
  cover_image?: string;
  created_at: string;
  date_time: string;
  description: string;
  is_published: boolean;
  uuid: string;
  project: ProjectDetail;
  project_uuid: string;
  title: string;
  status?: "ONGOING" | "UPCOMING" | "COMPLETED";
  type: "ONSITE" | "VIRTUAL" | "HYBRID";
  location?: string;
  user_uuid: string;
}

export interface EventsState {
  loading: boolean;
  error: string | null;
  lastCreated?: any;
  data?: CreateEventPayload;
  events?: EventsItem[];
  pagination: PostPagination;
  hasMore: boolean;
  reportData: ReportItem;
}
