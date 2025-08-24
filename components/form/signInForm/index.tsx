"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";
  return (
    <form className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2 w-full">
        <Label htmlFor="email" className="font-medium text-sm">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="example@email.com"
          className="border-[#434343] rounded-[8px] py-[19px] px-4"
        />
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
          <Input
            type={passwordType}
            id="password"
            placeholder="Password"
            className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
          />
          <Button onClick={togglePassword} className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2">
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
      </div>
      <Button className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold">Login</Button>
      <p className="text-center font-light text-base">
        Don’t have an account? <Link href="/sign-up" className="font-medium">Sign up</Link>
      </p>
    </form>
  );
};

export default SignInForm;
