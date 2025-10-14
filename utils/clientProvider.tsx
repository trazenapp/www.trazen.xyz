"use client";
import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import Provider from "@/context/web3AuthContext";
import { ToastContainer } from "react-toastify";
import { cookieToWeb3AuthState } from "@web3auth/modal";

interface ClientProviderProps {
  cookie: string;
  children: React.ReactNode;
}

const ClientProvider = ({ children, cookie }: ClientProviderProps) => {
  const web3authInitialState = cookieToWeb3AuthState(cookie);
  return (
    <ReduxProvider>
      <Provider web3authInitialState={web3authInitialState}>
        {children}
        <ToastContainer />
      </Provider>
    </ReduxProvider>
  );
};

export default ClientProvider;
