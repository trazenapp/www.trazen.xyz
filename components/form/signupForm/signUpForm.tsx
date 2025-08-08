"use client";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData, setSteps, setLoading } from "@/redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import DividerText from "@/components/dividerText";
import SignInWithGoogle from "@/components/form/signInWithGoogle";
import SignInWithWallet from "@/components/form/signInWithWallet";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { SignUpData } from "@/types/auth.types";
import Link from "next/link";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const watchPassword = watch("password");

  const signInWithWallet = () => {
    console.log("signInWithWallet");
    dispatch(setSteps(steps + 2));
  };


  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    dispatch(updateFormData({...data}));
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    }, 500);
  };
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Get Started"
          subtitle="Enter your details to create an account"
        />
      </div>
      <div className="flex flex-col gap-y-4 w-full mb-8">
        <SignInWithWallet onClick={signInWithWallet} />

        <SignInWithGoogle />
      </div>
      <DividerText text="Or sign up with" />
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="email" className="font-medium text-sm">
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                placeholder="example@email.com"
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="font-medium text-sm">
              Password
            </Label>
            <Link href="/forgot-password" className="font-normal text-sm">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type={passwordType}
                  id="password"
                  placeholder="Password"
                  className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
                  {...field}
                />
              )}
            />
            <Button
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex justify-between items-center">
            <Label htmlFor="cPassword" className="font-medium text-sm">
              Confirm Password
            </Label>
          </div>
          <div className="relative">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true, validate: (value) => value === watchPassword || "Passwords do not match" }}


              render={({ field }) => (
                <Input
                  type={passwordType}
                  id="cPassword"
                  placeholder="Password"
                  className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
                  {...field}

                />
              )}
            />
            <Button
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}  
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Sign Up"}
        </Button>
        <p className="text-center font-light text-base">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium">
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
};

export default SignUpForm;
