import { Middleware } from "@reduxjs/toolkit";
import Router from "next/router";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/*",
  "/projects",
  "/profile",
  "/discover",
  "/bounties",
  "/notifications",
  "/community",
  "/saved",
  "/gigs",
  "/settings",
  "/events",
];

export const authMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const result = next(action);
    if (typeof window === "undefined") return result;

    const state = store.getState();

    const token =
      state.login?.token ||
      state.register?.token ||
      state.login?.currentUser?.token ||
      localStorage.getItem("token");

    const isAuthenticated = !!token;

    if (
      action.type === "sign-in/fulfilled" ||
      action.type === "sign-up/fulfilled" ||
      action.type === "sign-in-with-wallet/fulfilled"
    ) {
      window.location.replace("/home");
    }

    // ✅ If user logout → redirect
    if (
      action.type === "login/logout" ||
      action.type === "register/logout" ||
      action.type === "logout/fulfilled"
    ) {
      window.location.replace("/sign-in");
    }

    return result;
  };
