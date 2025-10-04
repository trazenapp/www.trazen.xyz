import { Descendant } from "slate";
export type FormType = "feed" | "event" | "hiring" | "bounty";

export interface Post {
  project_uuid: string;
  content: string;
  medias: string[];
  is_published: boolean;
}

export interface PostState {
  loading: boolean;
  error: string | null;
  drafts: Record<FormType, Draft | null>;
  data: Post;
}

export interface Draft {
  type: FormType;
  data: Record<string, any>;
};

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