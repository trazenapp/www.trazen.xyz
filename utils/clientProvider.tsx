"use client";
import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const projectId: string = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const config = getDefaultConfig({
  appName: "Trazen2.0",
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

const queryClient = new QueryClient();

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
            <ToastContainer />
            <Toaster position="bottom-center" reverseOrder={false} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
};

export default ClientProvider;
