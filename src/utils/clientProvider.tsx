"use client";
import React from "react";
import ReduxProvider from "@/src/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ReduxProvider>
      {children}
      <ToastContainer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </ReduxProvider>
  );
};

export default ClientProvider;
