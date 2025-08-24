"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";
  return (
    <form className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex justify-between items-center">
          <Label htmlFor="newPassword" className="font-medium text-sm">
            New Password
          </Label>
        </div>
        <div className="relative">
          <Input
            type={passwordType}
            id="newPassword"
            placeholder="password"
            className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
          />
          <Button
            onClick={togglePassword}
            className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex justify-between items-center">
          <Label htmlFor="confirmPassword" className="font-medium text-sm">
            Confirm Password
          </Label>
        </div>
        <div className="relative">
          <Input
            type={passwordType}
            id="confirmPassword"
            placeholder="password"
            className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
          />
          <Button
            onClick={togglePassword}
            className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => router.push("/reset-password")}
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
      >
        Confirm
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
