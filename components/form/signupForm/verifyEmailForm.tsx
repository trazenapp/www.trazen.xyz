"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData } from "@/redux/slices/verifyEmailSlice";
import {
  setSteps,
  setLoading,
  signUp,
  resetForm,
} from "@/redux/slices/registerSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import {
  verifyEmail,
  resendEmailVerification,
  setResendLoading,
} from "@/redux/slices/verifyEmailSlice";
import { VerifyEmailData } from "@/types/auth.types";
import { toast } from "react-toastify";

const VerifyEmailForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerExpired, setTimerExpired] = useState(false);
  const { loading, user } = useAppSelector(
    (state: RootState) => state.register
  );
  const { data, resendLoading } = useAppSelector(
    (state: RootState) => state.verifyEmail
  );

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
    defaultValues: data,
  });

  const getEmail = user?.email;

  const emailSubtitle = `We've sent a code to ${getEmail}`;

  const onSubmit = async (formData: VerifyEmailData) => {
    const getFormData = {
      email: getEmail as string,
      token: formData.token,
    };
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData(getFormData));
      await dispatch(verifyEmail(getFormData)).unwrap();
      toast(<div>Email verified successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
      router.push("/on-boarding");
    } catch (err: any) {
      console.log(err);
      toast(<div>{err}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
  };

  const handleResend = async () => {
    try {
      dispatch(setResendLoading(true));
      setTimeLeft(300);
      setTimerExpired(false);
      await dispatch(resendEmailVerification(getEmail as string)).unwrap();
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
            name="token"
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
          {errors.token && (
            <p className="text-red-500 text-sm">{errors.token.message}</p>
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
            type="button"
            className="p-0 bg-transparent"
            onClick={handleResend}
            disabled={resendLoading || timerExpired}
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
    </Card>
  );
};

export default VerifyEmailForm;
