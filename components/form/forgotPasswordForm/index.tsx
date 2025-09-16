"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setLoading,
  resetForm,
  forgotPassword,
} from "@/redux/slices/forgotPasswordSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { ForgotPasswordData } from "@/types/auth.types";

const ForgotPasswordForm = () => {
  const { data, loading } = useAppSelector(
    (state: RootState) => state.forgotPassword
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    mode: "all",
    defaultValues: data,
  });
  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData(data));
      localStorage.setItem("email", data.email);
      console.log(data);
      await dispatch(forgotPassword(data)).unwrap();
      toast(<div>Password reset email sent</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
      router.push("/email-verification");
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
          <p className="text-red-500 text-sm">{errors.email.message || "Enter a valid email"}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        disabled={loading}
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Confirm"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
