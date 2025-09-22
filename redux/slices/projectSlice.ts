import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { AddProjectData, AddProjectState, AddProjectResponse } from "@/types/project.types";

const formData: AddProjectData = {
  name: "",
  description: "",
  avatar: "",
  wallet_uuid: "",
  social: "",
  whitepaper: "",
  team_size: 0,
  isTeam: "No",
}

const initialState: AddProjectState = {
  loading: false,
  error: null,
  projectData: formData,
  isFirstProject: false,
  steps: 1,
}

export const addProject = createAsyncThunk<AddProjectResponse, AddProjectData>(
  "project/addProject", 
  async (AddProjectData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post<AddProjectResponse>(
        "/v1/project",
        AddProjectData,
      );

      return response.data;
    } catch(error: any) {
      return rejectWithValue(error?.response?.data?.message || "Error adding Project");
    }
  }
);

const projectSlice = createSlice({
  name: "addProject",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateFormData: (state, action: PayloadAction<AddProjectData>) => {
      state.projectData = { ...state.projectData, ...action.payload };
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
    extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateFormData, setSteps, setLoading } =
  projectSlice.actions;

export default projectSlice.reducer;