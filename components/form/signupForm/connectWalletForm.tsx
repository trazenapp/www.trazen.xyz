"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData, setSteps, setLoading } from "@/redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { SignUpData } from "@/types/auth.types";
import SignInWithWallet from "@/components/form/signInWithWallet";

const ConnectWalletForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading, steps } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "all",
    defaultValues: data,
  });

  const skipStep = () => {
    dispatch(setSteps(steps + 3));
  };

  const signInWithWallet = () => {
    console.log("signInWithWallet");
    dispatch(setSteps(steps + 3));
  };

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    dispatch(updateFormData({ ...data }));
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    }, 500);
  };

  data.email
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Connect Wallet"
          subtitle="Consider connecting your wallet for a more immersive experience"
        />
      </div>
      <div className="flex flex-col gap-y-4 w-full mb-8">
        <SignInWithWallet onClick={signInWithWallet} />
      </div>
      <p className="text-center font-light text-base font-sans">
        Don’t have a wallet?{" "}
        <Button onClick={skipStep} className="font-medium p-0">
          Skip
        </Button>
      </p>
    </Card>
  );
};

export default ConnectWalletForm;
