"use client";
import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { Web3AuthProvider } from "@web3auth/modal/react";
import web3AuthContextConfig from "@/lib/web3authContext";
import { ToastContainer } from "react-toastify";

const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReduxProvider>
      {/* <Web3AuthProvider config={web3AuthContextConfig}> */}
        {children}
        <ToastContainer />
      {/* </Web3AuthProvider> */}
    </ReduxProvider>
  );
};

export default ClientProvider;
