import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/utils/axios";

export interface CreateWalletResponse {
  message: string;
}

export interface CreateWalletData {
  network: string;
  address: string;
}

export interface CreateWalletState {
  loading: boolean;
  error: string | null;
  data: CreateWalletData;
}

const formData: CreateWalletData = {
  network: "",
  address: "",
};

const initialState: CreateWalletState = {
  loading: false,
  error: null,
  data: formData,
};

export const createWallet = createAsyncThunk<
  CreateWalletResponse,
  CreateWalletData
>("create-wallet", async (CreateWalletData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<CreateWalletResponse>(
      "/v1/wallet",
      CreateWalletData,
      {
        headers: {
          "x-api-public": process.env.NEXT_PUBLIC_BASE_PUBLIC_KEY,
          "x-api-secret": process.env.NEXT_PUBLIC_BASE_SECRET_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Wallet Creation Failed"
    );
  }
});

const createWalletSlice = createSlice({
  name: "createWallet",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateFormData: (state, action: PayloadAction<CreateWalletData>) => {
      state.data = action.payload;
    },
    resetForm: (state) => {
      state.data = formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createWallet.fulfilled,
        (state, action: PayloadAction<CreateWalletResponse>) => {
          state.loading = false;
          state.data = formData;
        }
      )
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading, updateFormData, resetForm } =
  createWalletSlice.actions;
export default createWalletSlice.reducer;
