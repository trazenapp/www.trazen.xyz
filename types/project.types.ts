export interface AddProjectData {
  name: string;
  description: string;
  avatar: string;
  wallet_uuid?: string;
  social: string;
  whitepaper: string;
  team_emails?: string[];
  isTeam?: "Yes" | "No";
  category?: string[];
}

export interface AddProjectState {
  loading: boolean;
  error: string | null;
  projectData: AddProjectData;
  isFirstProject: boolean;
  steps: number;
  projects?: [];
}

export interface AddProjectResponse {
  status: number;
  success: boolean;
  message: string;
}