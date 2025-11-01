"use client";

import React, { useState } from "react";
import Image from "next/image";
import wallet from "@/public/solar_wallet.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";
import { useAppDispatch } from "@/redux/store";
import { SignInWalletData } from "@/types/auth.types";
import {
  updateFormData,
  setLoading,
  resetForm,
  clearError,
  signInWithWallet,
} from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInWithWallet() {
  // const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { signMessage } = useSignMessage();
  const [hasSigned, setHasSigned] = useState(false);

  // Message to sign
  const message = `Sign in to Wallet Demo\nTimestamp: ${Date.now()}`;

  // After connection, immediately trigger signature
  useEffect(() => {
    if (isConnected && address && !hasSigned) {
      setHasSigned(true); // prevent re-trigger
      signMessage(
        { message },
        {
          onSuccess: (signature) => {
            console.log("Signature:", signature);
            console.log("Wallet Address:", address);
            console.log("Network:", chain?.name ?? "Unknown");
          },
          onError: (error) => {
            console.error("Signature failed:", error);
            setHasSigned(false); // allow retry
          },
        }
      );
    }
  }, [isConnected, address, signMessage, hasSigned, chain]);

  // Reset signed state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setHasSigned(false);
    }
  }, [isConnected]);

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return null;

        return (
          <button
            onClick={openConnectModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isConnected ? "Connected" : "Sign in with Wallet"}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
