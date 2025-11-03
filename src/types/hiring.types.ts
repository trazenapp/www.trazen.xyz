import { BookmarkItem } from "./post.types";
import { PostPagination } from "@/src/types/post.types";

export interface HiringPostPayload {
  project_uuid: string;
  title: string;
  description: string;
  type: string;
  experience: string;
  location: string;
  location_type: string;
  pay_range: string;
  link: string;
  status: string;
  is_published: boolean;
}

export interface HiringPost {
  id: number;
  uuid: string;
  user_uuid: string;
  project_uuid: string;
  title: string;
  description: string;
  type: string;
  experience: string;
  location: string;
  location_type: string;
  pay_range: string;
  link: string;
  status: string;
  is_published: boolean;
  created_at: string;
  is_bookmarked: boolean;
  bookmarks: BookmarkItem[];
}

export interface HiringState {
  loading: boolean;
  error: string | null;
  lastCreated?: any;
  data?: {
    title: "";
    description: "";
    type: "ONSITE";
    experience?: string;
    location?: "";
    location_type?: "";
    pay_range?: "";
    link?: "";
    status?: "ONGOING";
    is_published: true;
  };
  hiringPosts: HiringPost[];
  hiringPostItem?: HiringPost;
  bookmark?: boolean;
  pagination: PostPagination;
  hasMore: boolean;
}
