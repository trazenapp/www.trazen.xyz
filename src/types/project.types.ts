import { UserProfile } from "@/src/types/user.types";
export interface AddProjectData {
  name: string;
  username: string;
  description: string;
  avatar: string;
  wallet_uuid?: string;
  social: string;
  whitepaper: string;
  team_emails?: string[];
  isTeam?: "Yes" | "No";
  category?: string[];
  chains?: string[];
  niche?: string[];
}

export interface ProjectDetail {
  id: number;
  uuid: string;
  user_uuid: string;
  user: UserProfile | null;
  wallet_uuid: string | null;
  name: string;
  description: string;
  social: string;
  whitepaper: string;
  avatar: string;
  categories: string[];
  team_emails: string[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  total_followers?: number;
  isBookmarked: boolean;
}

export interface AddProjectState {
  loading: boolean;
  error: string | null;
  projectData: AddProjectData;
  isFirstProject: boolean;
  steps: number;
  projects?: [];
  projectDetail: ProjectDetail | null;
}

export interface AddProjectResponse {
  status: number;
  success: boolean;
  message: string;
}
