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
  const { steps } = useAppSelector((state) => state.onboarding);
  const userRole = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User") || "{}").role
    : null;

  return (
    <div className="flex flex-col justify-center items-center">
      {steps === 1 && <SettingUpForm />}
      {steps === 2 && <InterestsForm />}
      {steps === 3 && <CreateFirstProjectForm />}
      {steps === 4 && <FirstProjectCategory />}
      {userRole === "USER" && steps === 5 ? (
        <FormSuccess
          title="Your account is ready"
          subtitle="You’ve completed the onboarding process, your news feed is ready for you. Engage your favorite projects and grow in the community "
          buttonText="Go to News feed"
          url="/home"
        />
      ) : userRole === "PIONEER" && steps === 5 ? (<FormSuccess
          title="Your account is awaiting approval"
          subtitle="You’ve completed the onboarding process and your account is under review. You can enjoy Trazen as an esteemed user for the meantime."
          buttonText="Go to News feed"
          url="/home"
        />) : null}
    </div>
  );
};

export default OnBoarding;
