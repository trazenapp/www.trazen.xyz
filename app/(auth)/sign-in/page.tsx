"use client";
import React from "react";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import DividerText from "@/components/dividerText";
import SignInWithGoogle from "@/components/form/signInWithGoogle";
import SignInWithWallet from "@/components/form/signInWithWallet";
import SignInForm from "@/components/form/signInForm";

const SignIn = () => {
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Welcome back to Trazen"
          subtitle="Enter your login details below"
        />
      </div>
      <div className="flex flex-col gap-y-4 w-full mb-8">
        {/* <SignInWithWallet /> */}
        <SignInWithGoogle />
      </div>
      <DividerText text="Or sign in with" />
      <SignInForm />
    </Card>
  );
};

export default SignIn;
