"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { continueWithGoogle } from "@/redux/slices/loginSlice";
import { ClipLoader } from "react-spinners";
import google from "@/public/google-icon.svg";

interface SignInWithGoogleProps {
  onClick?: () => void;
}
const SignInWithGoogle = ({ onClick }: SignInWithGoogleProps) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.login
  );

  const signinWithGoogle = async () => {
    const res = await dispatch(continueWithGoogle());
    console.log(res);
    const redirectUrl = res.payload;
    if (redirectUrl && typeof redirectUrl === "string") {
      window.location.href = redirectUrl;
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={signinWithGoogle}
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
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
    </>
  );
};

export default SignInWithGoogle;
