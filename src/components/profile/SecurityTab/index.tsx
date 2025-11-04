"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAppDispatch } from "@/src/redux/store";
import {
  updateFormData,
  setLoading,
  resetForm,
  changePassword,
  clearError,
} from "@/src/redux/slices/changePasswordSlice";
import { toast } from "react-toastify";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function SecurityTab() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {
    dispatch(clearError());
    try {
      dispatch(setLoading(true));
      dispatch(
        updateFormData({
          newPassword: data.newPassword,
          currentPassword: data.oldPassword,
        })
      );
      await dispatch(
        changePassword({
          newPassword: data.newPassword,
          currentPassword: data.oldPassword,
        })
      ).unwrap();
      toast(<div>Password changed successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
  };

  const passwordType = showPassword ? "text" : "password";

  return (
    <div className="flex-1 p-8 bg-transparent md:bg-[#161616] ml-0 md:ml-4">
      <h2 className="text-white mb-6">Security</h2>

      <div className="">
        <label htmlFor="link-wallet" className="font-medium">
          Linked Wallet
        </label>

        {/* <div id="link-wallet" className="mt-4">
          <ConnectWallet />
        </div> */}
      </div>
      <h2 className="mt-6">Change Password</h2>

      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Old Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="oldPassword" className="font-medium text-sm">
            Old Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="oldPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">
              {errors.oldPassword.message || "Enter a valid password"}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="newPassword" className="font-medium text-sm">
            New Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="newPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
                },
              })}
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="confirmPassword" className="font-medium text-sm">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="confirmPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message || "passwords do not match"}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-[#430B68] max-w-40 hover:bg-[#430B68] rounded-full font-semibold"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default SecurityTab;
