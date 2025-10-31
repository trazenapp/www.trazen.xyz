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
}

// {
//     "id": 55,
//     "uuid": "310a575a-a6a2-477a-8c36-b62558824202",
//     "email": "umf84596@toaik.com",
//     "username": "umf84596",
//     "password": "$2b$10$X6utNOy8Q/bHRmCRhnCs1u9hHqWhPx2Cpp6/VnZUxUzUJ.AZonDdi",
//     "title": "Founder",
//     "social": "https://x.com/umf84596",
//     "skills": [
//         "Web3.js/Ethers.js",
//         "Solidity"
//     ],
//     "interests": [
//         "Ethereum",
//         "Tezos",
//         "NFT",
//         "Metaverse"
//     ],
//     "role": "PIONEER",
//     "ref": "Google",
//     "email_verified_at": "2025-09-24T15:51:20.166Z",
//     "created_at": "2025-09-24T15:35:21.800Z",
//     "updated_at": "2025-09-24T16:25:44.518Z"
// }

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
  projects?: string[];
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
  3: "create-project",
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
