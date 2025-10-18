import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import {
  AddProjectData,
  AddProjectState,
  AddProjectResponse,
  ProjectDetail,
} from "@/types/project.types";

const formData: AddProjectData = {
  name: "",
  description: "",
  avatar: "",
  wallet_uuid: "",
  social: "",
  whitepaper: "",
  team_emails: [],
  isTeam: "No",
  category: [],
};

const initialState: AddProjectState = {
  loading: false,
  error: null,
  projectData: formData,
  isFirstProject: false,
  steps: 1,
  projects: [],
  projectDetail: null,
};

export const addProject = createAsyncThunk<AddProjectResponse, AddProjectData>(
  "project/addProject",
  async (AddProjectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AddProjectResponse>(
        "/v1/project",
        AddProjectData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error adding Project"
      );
    }
  }
);

export const getProject = createAsyncThunk(
  "project/getProject",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/project/private");

      console.log(response.data.data.projects);
      return response.data.data.projects;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error getting project data"
      );
    }
  }
);

export const getProjectDetail = createAsyncThunk(
  "project/getProjectDetail",
  async (project_uuid: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/v1/project/${project_uuid}`
      );

      return response.data.data.project;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error getting project data"
      );
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
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProject.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProjectDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetail = action.payload;
      })
      .addCase(getProjectDetail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearError, updateFormData, setSteps, setLoading } =
  projectSlice.actions;

export default projectSlice.reducer;
