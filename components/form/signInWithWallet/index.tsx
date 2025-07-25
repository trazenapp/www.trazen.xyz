import React from "react";
import { Button } from "@/components/ui/button";

const SignInWithWallet = () => {
  return (
    <Button
      variant="outline"
      className="bg-transparent border-[#303030] rounded-full w-full flex justify-center items-center gap-x-2.5 hover:bg-transparent text-[#F4F4F4F4] hover:text-[#F4F4F4F4] font-sans text-base md:text-xl font-medium"
    >
      Continue with wallet
    </Button>
  );
};

export default SignInWithWallet;
