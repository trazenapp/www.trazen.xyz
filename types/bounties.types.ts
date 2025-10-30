import { ProjectDetail } from "@/types/project.types";
import { PostPagination } from "@/types/post.types";

export interface BountyItem {
  project_uuid: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  link: string;
  status: string;
  is_published: boolean;
}

export interface BountiesState {
  loading: boolean;
  error: string | null;
  data?: BountyItem;
  bountyData?: BountyItemResponse[];
  bountyDetail?: BountyItemResponse | null;
  pagination: PostPagination;
  hasMore: boolean;
}

export interface BountyItemResponse {
  uuid: string;
  project_uuid: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  link: string;
  status: string;
  is_published: boolean;
  created_at: string;
  project: ProjectDetail;
}
