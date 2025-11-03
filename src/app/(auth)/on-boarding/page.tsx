"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/src/redux/store";
import InterestsForm from "@/src/components/form/signupForm/interestsForm";
import SettingUpForm from "@/src/components/form/signupForm/settingUpForm";
import FormSuccess from "@/src/components/form/formSuccess";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { setSteps } from "@/src/redux/slices/onboardingSlice";
import useAuthStepsGuard from "@/src/hooks/useAuthStepsGuard";

const OnBoarding = () => {
  useAuthStepsGuard(2);
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((state) => state.onboarding);
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
      {steps === 1 && <SettingUpForm />}
      {steps === 2 && <InterestsForm />}
      {steps === 3 && (
        <FormSuccess
          title="Your account is ready"
          subtitle="You’ve completed the onboarding process, your news feed is ready for you. Engage your favorite projects and grow in the community "
          buttonText="Go to News feed"
          url="/home"
        />
      )}
    </div>
  );
};

export default OnBoarding;
