"use client";

import React, { useState } from "react";
import Image from "next/image";
import wallet from "@/public/solar_wallet.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";
import { useAppDispatch } from "@/src/redux/store";
import { SignInWalletData } from "@/src/types/auth.types";
import {
  updateFormData,
  setLoading,
  resetForm,
  clearError,
  signInWithWallet,
} from "@/src/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const SignInWithWallet = () => {
  const { signMessageAsync, isPending } = useSignMessage();
  const [message] = useState(
    `Confirm sign-in to Trazen on ${new Date().toISOString()}`
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignTransaction = async ({ connected, account, chain }: any) => {
    if (connected) {
      try {
        const signature = await signMessageAsync({ message });
        const data = {
          network: chain.name,
          address: account.address,
          signature: signature,
        } as SignInWalletData;

        dispatch(clearError());
        dispatch(setLoading(true));
        await dispatch(signInWithWallet(data as any)).unwrap();
        toast(<div>Sign in successful</div>, {
          theme: "dark",
          type: "success",
        });
        router.replace("/home");
        dispatch(setLoading(false));
      } catch (error: any) {
        console.log("Signature rejected or failed:", error);
        toast(<div>{error}</div>, {
          theme: "dark",
          type: "error",
        });
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain && !chain.unsupported;

        React.useEffect(() => {
          handleSignTransaction({ connected, account, chain });
        }, [connected == true]);

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full"
          >
            <button
              type="button"
              disabled={isPending}
              onClick={openConnectModal}
              className="bg-transparent border border-[#303030] rounded-full w-full flex justify-center items-center gap-x-2.5 hover:bg-transparent text-[#F4F4F4F4] hover:text-[#F4F4F4F4] font-sans text-base md:text-xl font-medium h-[62px]"
            >
              <Image src={wallet} alt="wallet" width={24} />
              Continue with wallet
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default SignInWithWallet;
