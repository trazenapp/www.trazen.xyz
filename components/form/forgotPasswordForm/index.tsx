"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
  const router = useRouter();
  return (
    <form className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2 w-full">
        <Label htmlFor="email" className="font-medium text-sm">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="example@email.com"
          className="border-[#434343] rounded-[8px] py-[19px] px-4"
        />
      </div>
      <Button type="button" onClick={() => router.push("/email-verification")} className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold">Confirm</Button>
    </form>
  );
};

export default ForgotPasswordForm;
