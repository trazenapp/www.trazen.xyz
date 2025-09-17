"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { SignInData } from "@/types/auth.types";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setLoading,
  resetForm,
  signIn,
} from "@/redux/slices/loginSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useFirebaseMessaging } from "@/hooks/useFirebaseMessaging";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, loading } = useAppSelector((state: RootState) => state.login);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    mode: "all",
    defaultValues: data,
  });

  // "email": "tvd13337@jioso.com",
  // "password": "password"

  useFirebaseMessaging();

  const onSubmit = async (data: SignInData) => {
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData(data));
      console.log(data);
      await dispatch(signIn(data)).unwrap();
      toast(<div>Login Successful</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
      router.replace("/home");
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
  };

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? "text" : "password";

  return (
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
      <Button
        type="submit"
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        disabled={loading}
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Login"}
      </Button>
      <p className="text-center font-light text-base">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
