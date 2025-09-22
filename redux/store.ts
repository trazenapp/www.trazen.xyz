import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/redux/slices/authSlice"; 
import dashboardSidebarReducer from "@/redux/slices/dashboardSidebarSlice";
import registerReducer from "@/redux/slices/registerSlice";
import loginReducer from "@/redux/slices/loginSlice";
import forgotPasswordReducer from "@/redux/slices/forgotPasswordSlice";
import resetPasswordReducer from "@/redux/slices/resetPasswordSlice";
import verifyEmailReducer from "@/redux/slices/verifyEmailSlice";
import onboardingReducer from "@/redux/slices/onboardingSlice";
import fcmNotificationReducer from "@/redux/slices/fcmNotificationSlice";
import projectReducer from "@/redux/slices/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboardSidebar: dashboardSidebarReducer,
    register: registerReducer,
    login: loginReducer,
    fcmNotification: fcmNotificationReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,
    onboarding: onboardingReducer,
    project: projectReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;