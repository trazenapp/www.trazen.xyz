"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const ForgotPasswordEmailVerificationForm = () => {
  const router = useRouter();
  return (
    <form className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2 w-full">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
      </div>
      <Button type="button" onClick={() => router.push("/reset-password")} className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold">
        Verify
      </Button>
      <p className="text-center font-light text-base">
        Did not receive the email?{" "}
        <Button className="p-0 bg-transparent">Resend</Button> In 59s
      </p>
    </form>
  );
};

export default ForgotPasswordEmailVerificationForm;
