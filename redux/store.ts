import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/redux/slices/authSlice"; 
import dashboardSidebarReducer from "@/redux/slices/dashboardSidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboardSidebar: dashboardSidebarReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;