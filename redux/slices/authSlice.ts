import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AUTH_STEPS_ROUTE } from "@/types/auth.types";

const getInitialState = (): AuthState => {
  if (typeof window !== undefined) {
    const savedRole = localStorage.getItem("authUserRole") as
      | "USER"
      | "PIONEER"
      | null;
    const savedStep = localStorage.getItem("authLastCompletedStep");
    const lastCompletedStep = savedStep ? parseInt(savedStep, 10) : 0;
    const nextStep = lastCompletedStep + 1;

    return {
      isAuthenticated: false,
      authSteps: nextStep,
      lastCompletedStep,
      currentRoute:
        AUTH_STEPS_ROUTE[nextStep as 1 | 2 | 3] || AUTH_STEPS_ROUTE[1],
      role: savedRole,
    };
  }

  return {
    isAuthenticated: false,
    authSteps: 1,
    lastCompletedStep: 0,
    currentRoute: AUTH_STEPS_ROUTE[1],
    role: null,
  };
};

const authSlice = createSlice({
  name: "signUp",
  initialState: getInitialState(),
  reducers: {
    setUserRole: (state, action: PayloadAction<"USER" | "PIONEER">) => {
      state.role = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("authUserRole", action.payload);
      }
    },
    setAuthSteps: (state, action: PayloadAction<number>) => {
      state.authSteps = action.payload;
      state.currentRoute = AUTH_STEPS_ROUTE[action.payload as 1 | 2 | 3];
    },
    completeStep: (state, action: PayloadAction<number>) => {
      const completedStep = action.payload;
      if (completedStep > state.lastCompletedStep) {
        state.lastCompletedStep = completedStep;

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "authLastCompletedStep",
            completedStep.toString()
          );
        }
      }
    },
    resetFlow: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authLastCompletedStep");
        localStorage.removeItem("authUserRole");
        return getInitialState();
      }
    },
  },
});

export const { setUserRole, setAuthSteps, completeStep, resetFlow } =
  authSlice.actions;

export default authSlice.reducer;
