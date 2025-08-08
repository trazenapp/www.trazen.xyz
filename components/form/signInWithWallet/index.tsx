import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import wallet from "@/public/solar_wallet.svg"

interface SignInWithWalletProps {
  onClick?: () => void;
}

const SignInWithWallet = ({ onClick }: SignInWithWalletProps) => {
  return (
    <Button
    type="button"
      variant="outline"
      onClick={onClick}
      className="bg-transparent border-[#303030] rounded-full w-full flex justify-center items-center gap-x-2.5 hover:bg-transparent text-[#F4F4F4F4] hover:text-[#F4F4F4F4] font-sans text-base md:text-xl font-medium"
    >
      <Image
        src={wallet}
        alt="wallet"
        width={24}
      />

      Continue with wallet
    </Button>
  );
};

export default SignInWithWallet;
