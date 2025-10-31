import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RootState, useAppSelector } from "@/redux/store";
import { ClipLoader } from "react-spinners";
import google from "@/public/google-icon.svg";

interface SignInWithGoogleProps {
  onClick?: () => void;
}
const SignInWithGoogle = ({ onClick }: SignInWithGoogleProps) => {
  const { loading, error } = useAppSelector(
    (state: RootState) => state.register
  );

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        disabled={loading}
        className="bg-transparent border-[#303030] rounded-full w-full flex justify-center items-center gap-x-2.5 hover:bg-transparent text-[#F4F4F4F4] hover:text-[#F4F4F4F4] font-sans text-base md:text-xl font-medium"
      >
        <Image src={google} alt="google" width={24} />
        {loading ? (
          <ClipLoader color="#F4F4F4F4" size={20} />
        ) : (
          "Continue with Google"
        )}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default SignInWithGoogle;
