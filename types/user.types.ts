// src/types/user.types.ts
export interface Wallet {
  id: number;
  uuid: string;
  user_uuid: string;
  network: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  uuid: string;
  email: string;
  username: string;
  title: string | null;
  social: string | null;
  skills: string | null;
  interests: string | null;
  role: string;
  ref: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  wallets: Wallet[];
}
