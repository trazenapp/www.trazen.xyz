"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ResetPasswordData } from "@/types/auth.types";
import { useAppDispatch, useAppSelector, RootState } from "@/redux/store";
import {
  updateFormData,
  setLoading,
  resetForm,
  resetPassword,
} from "@/redux/slices/resetPasswordSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { data, loading } = useAppSelector((state: RootState) => state.resetPassword);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";
  const getEmail = localStorage.getItem("email") || "";
  const getToken = localStorage.getItem("code") || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    mode: "all",
    defaultValues: data,
  });

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData({ ...data, email: getEmail as string, token: getToken as string }));
      await dispatch(resetPassword(data)).unwrap();
      toast(<div>Password reset successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
      localStorage.removeItem("email");
      localStorage.removeItem("code");
      router.push("/sign-in");
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
    <form
      className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex justify-between items-center">
          <Label htmlFor="newPassword" className="font-medium text-sm">
            New Password
          </Label>
        </div>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="relative">
              <Input
                type={passwordType}
                id="newPassword"
                placeholder="password"
                className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
                {...field}
              />
              <Button
                onClick={togglePassword}
                className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
            </div>
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message || "Enter a valid password"}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex justify-between items-center">
          <Label htmlFor="confirmPassword" className="font-medium text-sm">
            Confirm Password
          </Label>
        </div>
        <Controller
          name="cPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
        <div className="relative">
          <Input
            type={passwordType}
            id="confirmPassword"
            placeholder="password"
            className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
            {...field}
          />
          <Button
            onClick={togglePassword}
            className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
          )}
        />
          {errors.cPassword && (
          <p className="text-red-500 text-sm">
            {errors.cPassword.message || "Passwords don't match"}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
      >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Confirm"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
