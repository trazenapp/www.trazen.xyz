export interface User {
  uuid: string;
  email: string;
  username: string;
  role: string;
  title?: string;
  social?: string;
  skills?: string[];
  interests?: string[];
  ref?: string;
  avatar?: string;
  wallets?: string[];
}

export interface Session {
  user: User;
  token: string;
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
  email: string;
  social?: string;
  title?: string;
  skills: string[];
  hearAboutUs?: string;
  interests: string[];
  chains?: string[];
  niche?: string[];
  projects?: string[] | null;
  ref: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInWalletData {
  network: string;
  address: string;
  signature: string;
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

export const AUTH_STEPS_ROUTE = {
  1: "/sign-up",
  2: "/on-boarding",
  3: "/create-project",
};

export interface AuthState {
  isAuthenticated: boolean;
  authSteps?: number;
  lastCompletedStep: number;
  currentRoute: (typeof AUTH_STEPS_ROUTE)[1];
  role: "USER" | "PIONEER" | null;
}

export interface SignUpState {
  loading: boolean;
  error: string | null;
  formData: SignUpData;
  isAuthenticated: boolean;
  steps: number;
  user: User | null;
  token: string | null;
}

export interface SignUpResponse {
  data: User;
  token: string;
}

export interface SignInState {
  loading: boolean;
  error: string | null;
  data: SignInData;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  sessions: Session[];
  currentUser: Session | null;
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
  formData: VerifyEmailData;
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

export interface SignInResponse {
  data: SignInResponseData;
}

export interface ForgotPasswordResponse {
  message: string;
}
