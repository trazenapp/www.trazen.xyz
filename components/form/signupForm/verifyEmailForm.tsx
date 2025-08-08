"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData, setSteps, setLoading } from "@/redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { SignUpData } from "@/types/auth.types";

const VerifyEmailForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading, steps } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "all",
    defaultValues: data,
  });

  const getEmail = data.email;
  console.log(getEmail);

  const emailSubtitle = `We've sent a code to ${getEmail}`;

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    dispatch(updateFormData({ ...data }));
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    }, 500);
  };

  const resendCode = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading title="Connect Email" subtitle={emailSubtitle} />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Controller
            name="emailCode"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup className="w-full gap-x-4 *:border-0 *:bg-[#272727] *:md:w-[70px] *:md:h-[70px] *:w-[46px] *:h-[46px] *:md:rounded-[12px] *:rounded-[8px] *:data-[active=true]:border-[#430B68] *:data-[active=true]:ring-[#430B68]">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.emailCode && (
            <p className="text-red-500 text-sm">{errors.emailCode.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Verify"}
        </Button>
        <p className="text-center font-light text-base">
          Did not receive the email?{" "}
          <Button
            // onClick={skipStep}
            className="font-medium p-0"
          >
            Resend
          </Button>
          {" "}In 59s
        </p>
      </form>
    </Card>
  );
};

export default VerifyEmailForm;
