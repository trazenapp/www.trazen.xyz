"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/redux/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const InnerAuthChecker = ({ children }: ReduxProviderProps) => {
  const router = useRouter();
  const login = useAppSelector((state) => state.login);
  const register = useAppSelector((state) => state.register);

  useEffect(() => {
    const token =
      login?.token ||
      register?.token ||
      login?.currentUser?.token ||
      localStorage.getItem("token");

      const publicRoutes = [
      "/",
      "/sign-in",
      "/sign-up",
    ];

    const currentPath = window.location.pathname;

    if (!token && !publicRoutes.includes(currentPath)) router.replace("/sign-in");
  }, [login, register]);

  return children;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerAuthChecker>{children}</InnerAuthChecker>
      </PersistGate>
    </Provider>
  );
}
