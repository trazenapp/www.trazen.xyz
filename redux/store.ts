import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
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
import postReducer from "@/redux/slices/postSlice";
import draftsReducer from "@/redux/slices/draftSlice";
import profileReducer from "@/redux/slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["register", "login"],
};

const rootReducer = combineReducers({
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
  post: postReducer,
  drafts: draftsReducer,
  user: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
