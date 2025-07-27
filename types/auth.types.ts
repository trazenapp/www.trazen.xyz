export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SignUpState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface SignUpResponse {
  user: User;
  token: string;
  message: string;
}

export interface SignUpData {
  role: "user" | "pioneer";
  email: string;
  password: string;
  confirmPassword: string;  
  username: string;
  skills: string[];
  hearAboutUs: string;
  chains: string[];
  niche: string[];
  projects: string[];
}

export interface SignInState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}