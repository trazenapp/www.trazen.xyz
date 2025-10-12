import { ProjectDetail } from "@/types/project.types";

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
