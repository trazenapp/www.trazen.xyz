"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import InterestsForm from "@/components/form/signupForm/interestsForm";
import SettingUpForm from "@/components/form/signupForm/settingUpForm";
import FormSuccess from "@/components/form/formSuccess";

const OnBoarding = () => {
  const { steps } = useAppSelector((state) => state.onboarding);

  return (
    <div className="flex flex-col justify-center items-center">
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
