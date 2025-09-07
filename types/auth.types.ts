export interface User {
  id: string;
  email: string;
  name: string;
}

type OptionType = {
  value: string;
  label: string;
};

export interface SignUpData {
  role: "user" | "pioneer";
  email: string;
  password: string;
  confirmPassword: string;
  emailCode: string;
  username: string;
  skills: OptionType[];
  hearAboutUs: string;
  chains: string[];
  niche: string;
  projects: string;
}

// export interface EditProjectData {
//   projectName: string;
//   skills: OptionType[];
//   chains: string[];
//   niche: string;
//   projects: string;
// }

export interface SignUpState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  steps: number;
  data: SignUpData;
}

export interface SignUpResponse {
  user: User;
  token: string;
  message: string;
}

export interface SignInState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}
