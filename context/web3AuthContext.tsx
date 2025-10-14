// @ts-nocheck

"use client";
import {
  Web3AuthProvider,
  type Web3AuthContextConfig,
} from "@web3auth/modal/react";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { IWeb3AuthState, WEB3AUTH_NETWORK } from "@web3auth/modal";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID as string;

const queryClient = new QueryClient();

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    ssr: true,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "Ethereum Mainnet",
      blockExplorerUrl: "https://etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
  },
};

export default function Provider({
  children,
  web3authInitialState,
}: {
  children: React.ReactNode;
  web3authInitialState: IWeb3AuthState | undefined;
}) {
  React.useEffect(() => {
    console.log("Provider mounted, clientId:", clientId);
    console.log("Web3Auth initialState:", web3authInitialState);
    console.log("Web3Auth network:", WEB3AUTH_NETWORK.SAPPHIRE_MAINNET);
  }, [web3authInitialState]);
  return (
    <Web3AuthProvider
      config={web3AuthContextConfig}
      initialState={web3authInitialState}
      onError={(error) => console.error("Web3AuthProvider error:", error)}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>{children}</WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  );
}
