"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import CreateFirstProjectForm from "@/components/form/signupForm/createFirstProjectForm";
import FirstProjectCategory from "@/components/form/signupForm/firstProjectCategory";
import InterestsForm from "@/components/form/signupForm/interestsForm";
import SettingUpForm from "@/components/form/signupForm/settingUpForm";
import FormSuccess from "@/components/form/formSuccess";
import FileInput from "@/components/ui/FileInput";

const OnBoarding = () => {  
  const { steps, data, user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-center items-center">
      {steps === 1 && <SettingUpForm />}
      {steps === 2 && <InterestsForm />}
      {steps === 3 && <CreateFirstProjectForm />}
      {steps === 4 && <FirstProjectCategory />}
      {steps === 5 && (
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
