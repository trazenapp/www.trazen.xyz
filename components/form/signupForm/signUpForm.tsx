"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setSteps,
  setLoading,
  signUp,
  resetForm,
} from "@/redux/slices/registerSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import DividerText from "@/components/dividerText";
import SignInWithGoogle from "@/components/form/signInWithGoogle";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { SignUpData } from "@/types/auth.types";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { formData, loading, steps, error, user } = useAppSelector(
    (state: RootState) => state.register
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "all",
    defaultValues: formData,
  });

  const watchPassword = watch("password");

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";

  const onSubmit = async (data: SignUpData) => {
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData({...data}));
      await dispatch(signUp(data)).unwrap();
      toast(<div>Account Created</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
      dispatch(setSteps(steps + 1));
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
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
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message || "Enter a valid email"}
            </p>
          )}
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
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message || "Enter a valid password"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex justify-between items-center">
            <Label htmlFor="cPassword" className="font-medium text-sm">
              Confirm Password
            </Label>
          </div>
          <div className="relative">
            <Controller
              name="cPassword"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              }}
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
          {errors.cPassword && (
            <p className="text-red-500 text-sm">
              {errors.cPassword.message || "Passwords do not match"}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
          disabled={loading}
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
