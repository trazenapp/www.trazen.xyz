import { ProjectDetail } from "./project.types";
import { UserProfile } from "./user.types";
export type FormType = "feed" | "events" | "hiring" | "bounties";

export interface Post {
  project_uuid: string;
  content: string;
  medias: string[];
  is_published: boolean;
}
export interface PostPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CommentItem {
  content: string;
  created_at: string;
  user: UserProfile;
  uuid: string;
  id: number;
  upvoteCount?: number;
  downvoteCount?: number;
  voteStatus?: "UPVOTE" | "DOWNVOTE" | null;
  comments: {
    comment_uuid: string;
    content: string;
    created_at: string;
    uuid: string;
  };
}

export interface VoteItem {
  uuid?: string;
  user_uuid?: string;
  value?: "UPVOTE" | "DOWNVOTE";
}

export interface BookmarkItem {
  uuid?: string;
}

export interface ReportItem {
  reason: "SCAM" | "FAKE" | "INAPPROPRIATE" | "MISLEADING" | "OTHER";
  details: string;
}

export interface PostItem {
  uuid?: string;
  user_uuid?: string;
  project_uuid?: string;
  content: string;
  medias?: string[];
  created_at?: string;
  updated_at?: string;
  upvoteCount?: number;
  downvoteCount?: number;
  commentCount?: number;
  is_published?: boolean;
  voteStatus?: "UPVOTE" | "DOWNVOTE" | null;
  project?: ProjectDetail;
  is_approved?: boolean;
  avatar?: string;
  name?: string;
  comments?: CommentItem[];
  bookmarks?: BookmarkItem[];
  votes?: VoteItem[];
  isBookmarked?: boolean;
  isFollowing?: boolean;
}

export interface PostState {
  loading: boolean;
  error: string | null;
  drafts: Record<FormType, Draft | null>;
  data: Post;
  pagination: PostPagination;
  hasMore: boolean;
  publicPosts: PostItem[];
  privatePosts: PostItem[];
  followedPosts: PostItem[];
  postDetails: PostItem;
  bookmark: boolean;
  reportData: ReportItem;
  comments: CommentItem[];
}

export interface Draft {
  type: FormType;
  data: Record<string, any>;
}

export interface Event {
  project_uuid: string;
  title: string;
  description: string;
  cover_image: string;
  status: string;
  start_time: string;
  end_time: string;
}

// {
//   "project_uuid": "123e4567-e89b-12d3-a456-426614174000",
//   "title": "My First Event",
//   "description": "<p>This is the content of my first event.</p>",
//   "cover_image": "https://example.com/image.jpg",
//   "status": "ONGOING",
//   "start_time": "2023-10-01T10:00:00Z",
//   "end_time": "2023-10-01T12:00:00Z"
// }
