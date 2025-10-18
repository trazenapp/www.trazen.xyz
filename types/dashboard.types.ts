export interface ChartItem {
  month: number;
  count: number;
  year: number;
}

export interface ProjectItem {
  avatar: string;
  name: string;
  uuid: string;
}

export interface FollowersData {
  OverviewCount: number;
  chart: ChartItem[];
  project: ProjectItem[];
}

export interface DashboardState {
  loading: boolean;
  followers: FollowersData;
  error: string | null;
}

