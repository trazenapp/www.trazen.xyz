"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { Button } from "@/src/components/ui/button";
import { RootState } from "@/src/redux/store";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  updateFormData,
  setLoading,
  resetForm,
  verifyEmail,
  resendEmailVerification,
  setResendLoading,
} from "@/src/redux/slices/verifyEmailSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { VerifyEmailData } from "@/src/types/auth.types";

const ForgotPasswordEmailVerificationForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerExpired, setTimerExpired] = useState(false);
  const { formData, loading, resendLoading } = useAppSelector(
    (state: RootState) => state.verifyEmail
  );
  const getEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailData>({
    mode: "all",
    defaultValues: formData,
  });

  const onSubmit = async (data: VerifyEmailData) => {
    try {
      dispatch(setLoading(true));
      localStorage.setItem("code", data.token);
      dispatch(updateFormData({ ...data, email: getEmail as string }));
      await dispatch(verifyEmail(data)).unwrap();
      toast(<div>Email verified successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm(formData));
      router.push("/reset-password");
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
  };

  const handleResend = async (data: string) => {
    try {
      dispatch(setResendLoading(true));
      setTimeLeft(300);
      setTimerExpired(false);
      await dispatch(resendEmailVerification(data)).unwrap();
      toast(<div>Email verification token resent</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setResendLoading(false));
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setResendLoading(false));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <form
      className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-2 w-full">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              {...field}
            >
              <InputOTPGroup className="w-full flex gap-x-4">
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={0}
                />
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={1}
                />
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={2}
                />
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={3}
                />
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={4}
                />
                <InputOTPSlot
                  className="w-[70px] h-[70px] text-2xl md:text-[36px] bg-[#272727] border-0 focus:border-2 focus:border-[#430B68] data-[active=true]:border-2 data-[active=true]:border-[#430B68] active:border-2 active:border-[#430B68] rounded-[12px]"
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.token && (
          <p className="text-red-500 text-sm">
            {errors.token.message || "Enter a valid code"}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        disabled={loading}
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Verify"}
      </Button>
      <p className="text-center font-light text-base">
        Did not receive the email?{" "}
        <Button
          className="p-0 bg-transparent"
          onClick={() => handleResend(getEmail as string)}
          disabled={resendLoading}
        >
          {resendLoading ? (
            <ClipLoader color="#F4F4F4F4" size={10} />
          ) : (
            "Resend"
          )}
        </Button>{" "}
        In {formatTime(timeLeft)}
      </p>
    </form>
  );
};

export default ForgotPasswordEmailVerificationForm;
