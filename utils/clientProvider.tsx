"use client";
import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import Provider from "@/context/web3AuthContext";
import { ToastContainer } from "react-toastify";
import { cookieToWeb3AuthState } from "@web3auth/modal";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ClientProviderProps {
  cookie: string;
  children: React.ReactNode;
}

const projectID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const config = getDefaultConfig({
  appName: "Trazen",
  projectId: projectID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

const queryClient = new QueryClient();

const ClientProvider = ({ children, cookie }: ClientProviderProps) => {
  const web3authInitialState = cookieToWeb3AuthState(cookie);
  return (
    <ReduxProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
};

export default ClientProvider;
