"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, RootState } from "@/src/redux/store";
import { updateFormData } from "@/src/redux/slices/verifyEmailSlice";
import { setLoading, resetForm } from "@/src/redux/slices/registerSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { Button } from "@/src/components/ui/button";
import Card from "@/src/components/card";
import FormHeading from "@/src/components/formHeading";
import ResetTimer from "@/src/components/resetTimer";
import {
  verifyEmail,
  resendEmailVerification,
  setResendLoading,
} from "@/src/redux/slices/verifyEmailSlice";
import { completeStep, setAuthSteps } from "@/src/redux/slices/authSlice";
import { VerifyEmailData, AUTH_STEPS_ROUTE } from "@/src/types/auth.types";
import { toast } from "react-hot-toast";

const VerifyEmailForm = () => {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(300);
  const { formData, resendLoading } = useAppSelector(
    (state: RootState) => state.verifyEmail
  );
  const { authSteps } = useAppSelector((state: RootState) => state.auth);
  const { loading, user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.register
  );
  const router = useRouter();
  // if (authSteps === 1) {
  //   router.replace("/sign-up");
  // }

  console.log(isAuthenticated);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailData>({
    mode: "all",
    defaultValues: formData,
  });

  console.log(formData);

  const getEmail = user?.email;

  const emailSubtitle = `We've sent a code to ${getEmail}`;

  const onSubmit = async (data: VerifyEmailData) => {
    const getFormData = {
      email: getEmail as string,
      token: data.token,
    };
    console.log(formData);
    try {
      dispatch(setLoading(true));
      dispatch(updateFormData(getFormData));
      await dispatch(verifyEmail(getFormData)).unwrap();
      toast.success((t) => <div>Email verified successfully</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setLoading(false));
      dispatch(resetForm(formData));
      dispatch(completeStep(1));
      dispatch(setAuthSteps(2));
      // router.push(getRouteForStep(2));
    } catch (err: any) {
      console.log(err);
      toast.error((t) => <div>{err}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setLoading(false));
    }
  };

  const handleResend = async () => {
    try {
      dispatch(setResendLoading(true));
      setTimeLeft(300);
      await dispatch(resendEmailVerification(getEmail as string)).unwrap();
      toast.success((t) => <div>Email Verification Code Resent</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setResendLoading(false));
    } catch (err: any) {
      console.log(err);
      toast.error((t) => <div>{err}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setResendLoading(false));
    }
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
          <ResetTimer
            initialSeconds={300}
            onResend={handleResend}
            storageKey="email_resend_timer"
          />
        </p>
      </form>
    </Card>
  );
};

export default VerifyEmailForm;
