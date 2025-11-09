import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authMiddleware } from "./middleware/authMiddleware";
import { combineReducers } from "redux";
import authReducer from "@/src/redux/slices/authSlice";
import dashboardSidebarReducer from "@/src/redux/slices/dashboardSidebarSlice";
import registerReducer from "@/src/redux/slices/registerSlice";
import loginReducer from "@/src/redux/slices/loginSlice";
import forgotPasswordReducer from "@/src/redux/slices/forgotPasswordSlice";
import resetPasswordReducer from "@/src/redux/slices/resetPasswordSlice";
import verifyEmailReducer from "@/src/redux/slices/verifyEmailSlice";
import onboardingReducer from "@/src/redux/slices/onboardingSlice";
import fcmNotificationReducer from "@/src/redux/slices/fcmNotificationSlice";
import projectReducer from "@/src/redux/slices/projectSlice";
import postReducer from "@/src/redux/slices/postSlice";
import bountiesReducer from "@/src/redux/slices/bountiesSlice";
// import draftsReducer from "@/src/redux/slices/draftSlice";
import profileReducer from "@/src/redux/slices/userSlice";
import eventsReducer from "@/src/redux/slices/eventSlice";
import hiringReducer from "@/src/redux/slices/hiringSlice";
import bookmarkReducer from "@/src/redux/slices/bookmarkSlice";
import changePasswordReducer from "@/src/redux/slices/changePasswordSlice";
import profileSettingsReducer from "@/src/redux/slices/profileSlice";
import createWalletReducer from "@/src/redux/slices/createWallet";
import discoverPostReducer from "@/src/redux/slices/discoverPostSlice";
import dashboardReducer from "@/src/redux/slices/dashboardSlice";
import notificationReducer from "@/src/redux/slices/notificationsSlice";

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const lStorage =
  typeof window !== "undefined"
    ? require("redux-persist/lib/storage").default
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: lStorage,
  whitelist: ["register", "login", "auth"],
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
  // drafts: draftsReducer,
  user: profileReducer,
  events: eventsReducer,
  hiring: hiringReducer,
  bookmark: bookmarkReducer,
  changePassword: changePasswordReducer,
  profileSettings: profileSettingsReducer,
  createWallet: createWalletReducer,
  discoverPost: discoverPostReducer,
  bounties: bountiesReducer,
  dashboard: dashboardReducer,
  notifications: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
  }).concat(authMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
