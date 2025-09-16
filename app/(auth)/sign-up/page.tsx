"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import RoleForm from "@/components/form/signupForm/roleForm";
import ConnectEmailForm from "@/components/form/signupForm/connectEmailForm";
import ConnectWalletForm from "@/components/form/signupForm/connectWalletForm";
import VerifyEmailForm from "@/components/form/signupForm/verifyEmailForm";
import SignUpForm from "@/components/form/signupForm/signUpForm";

const SignUp = () => {
  const { steps } = useAppSelector((state) => state.register);
  return (
    <div className="flex flex-col justify-center items-center">
      {steps === 1 && <RoleForm />}
      {steps === 2 && <SignUpForm />}
      {steps === 3 && <ConnectWalletForm />}
      {steps === 4 && <ConnectEmailForm />}
      {steps === 5 && <VerifyEmailForm />}
    </div>
  );
};

export default SignUp;
