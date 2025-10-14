"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import wallet from "@/public/solar_wallet.svg";
import {
  useWeb3Auth,
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
} from "@web3auth/modal/react";
import { BrowserProvider } from "ethers";

// interface SignInWithWalletProps {
//   onClick?: () => void;
// }

// const SignInWithWallet = ({ onClick }: SignInWithWalletProps) => {
const SignInWithWallet = () => {
  const { web3Auth } = useWeb3Auth();
  const {
    connect,
    isConnected,
    loading: connectLoading,
    error: connectError,
  } = useWeb3AuthConnect();

  // useEffect(() => {
  //   const getAddress = async () => {
  //     if (!provider) return; // wait for connection
  //     try {
  //       const ethersProvider = new BrowserProvider(provider as any);
  //       const signer = await ethersProvider.getSigner();
  //       const addr = await signer.getAddress();
  //       // setAddress(addr);6
  //       console.log("Connected address:", addr);
  //     } catch (err) {
  //       console.error("Failed to get address:", err);
  //     }
  //   };

  //   getAddress();
  // }, [provider]);

  useEffect(() => {
    console.log("Web3Auth instance:", web3Auth);
    console.log("isConnected", isConnected);
    console.log("connectLoading", connectLoading);
    console.log("error ", connectError);
  }, [web3Auth, isConnected, connectLoading, connectError]);

  const handleConnect = async () => {
    try {
      console.log("Attempting to open Web3Auth modal...");
      await connect();
      console.log("Modal connect triggered");
    } catch (err) {
      console.error("Connect failed:", err);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleConnect}
      className="bg-transparent border-[#303030] rounded-full w-full flex justify-center items-center gap-x-2.5 hover:bg-transparent text-[#F4F4F4F4] hover:text-[#F4F4F4F4] font-sans text-base md:text-xl font-medium"
    >
      <Image src={wallet} alt="wallet" width={24} />
      Continue with wallet
    </Button>
  );
};

export default SignInWithWallet;
