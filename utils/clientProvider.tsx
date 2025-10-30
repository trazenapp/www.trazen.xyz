"use client";
import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Provider from "@/context/web3AuthContext";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { cookieToWeb3AuthState } from "@web3auth/modal";

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
  return (
    <ReduxProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <Provider web3authInitialState={web3authInitialState}>
        {children}
        <ToastContainer />
        <Toaster position="bottom-center" reverseOrder={false} />
      </Provider>
    </ReduxProvider>
  );
};

export default ClientProvider;
