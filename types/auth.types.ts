export interface User {
  uuid: string;
  email: string;
  username: string;
  role: string;
}

type OptionType = {
  value: string;
  label: string;
};

export interface SignUpData {
  role: "USER" | "PIONEER";
  email: string;
  password: string;
  cPassword?: string;
}

export interface OnboardingData {
  username: string;
  xHandle?: string;
  title?: string;
  skills: OptionType[];
  hearAboutUs: string;
  chains: string[];
  niche: string;
  projects: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  email: string;
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  cPassword?: string;
}

// export interface EditProjectData {
//   projectName: string;
//   skills: OptionType[];
//   chains: string[];
//   niche: string;
//   projects: string;
// }

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  steps?: number;
  data: SignUpData | OnboardingData | SignInData | VerifyEmailData | ForgotPasswordData | ResetPasswordData;
}

export interface SignUpState {
  loading: boolean;
  error: string | null;
  formData: SignUpData;
  isAuthenticated: boolean;
  steps: number;
  user: User | null;
}

export interface SignUpResponse {
  user: User;
}

export interface SignInState {
  loading: boolean;
  error: string | null;
  data: SignInData;
  isAuthenticated: boolean;
  user: User | null;
}

export interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  data: ForgotPasswordData;
}

export interface EmailVerificationState {
  loading: boolean;
  resendLoading: boolean;
  error: string | null;
  data: VerifyEmailData;
}

export interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  data: ResetPasswordData;
}

export interface OnboardingState {
  loading: boolean;
  error: string | null;
  data: OnboardingData;
  steps: number;
}

export interface SignInResponseData {
  user: User;
  token: string;
}
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM2VkOWQ2NjYtNzMzYy00MmIwLWE0YmUtNGFkZWUzNDM5NjJmIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6InR2ZDEzMzM3QGppb3NvLmNvbSIsImlwQWRkcmVzcyI6Ijo6ZmZmZjoxMC4wLjEuOSIsImlhdCI6MTc1ODA2NjI4NywiZXhwIjoxNzU4NjcxMDg3fQ.ptU-aRNKrkD1Br1Sr0LANOwmjQh9F_D3c5hIoIJTmec"
// user
// : 
// created_at
// : 
// "2025-09-14T10:25:22.480Z"
// email
// : 
// "tvd13337@jioso.com"
// role
// : 
// "USER"
// updated_at
// : 
// "2025-09-14T10:43:20.359Z"
// username
// : 
// "tvd13337"
// uuid
// : 
// "3ed9d666-733c-42b0-a4be-4adee343962f"

export interface SignInResponse {
  data: SignInResponseData
}

export interface ForgotPasswordResponse {
  message: string;
}

