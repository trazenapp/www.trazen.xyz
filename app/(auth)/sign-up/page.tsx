"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import RoleForm from "@/components/form/signupForm/roleForm";
import VerifyEmailForm from "@/components/form/signupForm/verifyEmailForm";
import SignUpForm from "@/components/form/signupForm/signUpForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSteps } from "@/redux/slices/registerSlice";
import useAuthStepsGuard from "@/hooks/useAuthStepsGuard";

const SignUp = () => {
  useAuthStepsGuard(1);
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((state) => state.register);
  const handlePrevStep = (steps: number) => {
    if (steps === 1) return;

    return dispatch(setSteps(steps - 1));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 md:w-9/12 lg:w-5/12 mb-6">
        <Button
          onClick={() => handlePrevStep(steps)}
          disabled={steps === 1}
          className="flex items-center gap-x-4 font-sans text-sm"
        >
          <ArrowLeft /> Back
        </Button>
      </div>

      {steps === 1 && <RoleForm />}
      {steps === 2 && <SignUpForm />}
      {steps === 3 && <VerifyEmailForm />}
    </div>
  );
};

export default SignUp;
