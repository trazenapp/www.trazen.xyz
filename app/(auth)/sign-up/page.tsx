"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import RoleForm from "@/components/form/signupForm/roleForm";
import ConnectEmailForm from "@/components/form/signupForm/connectEmailForm";
import ConnectWalletForm from "@/components/form/signupForm/connectWalletForm";
import CreateFirstProjectForm from "@/components/form/signupForm/createFirstProjectForm";
import FirstProjectCategory from "@/components/form/signupForm/firstProjectCategory";
import InterestsForm from "@/components/form/signupForm/interestsForm";
import VerifyEmailForm from "@/components/form/signupForm/verifyEmailForm";
import SettingUpForm from "@/components/form/signupForm/settingUpForm";
import SignUpForm from "@/components/form/signupForm/signUpForm";
import FormSuccess from "@/components/form/formSuccess";

const SignUp = () => {
  const { steps, data } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-center items-center">
      {steps === 1 && <RoleForm />}
      {steps === 2 && <SignUpForm />}
      {steps === 3 && <ConnectWalletForm />}
      {steps === 4 && <ConnectEmailForm />}
      {steps === 5 && <VerifyEmailForm />}
      {steps === 6 && <SettingUpForm />}
      {steps === 7 && <InterestsForm />}
      {steps === 8 && <CreateFirstProjectForm />}
      {steps === 9 && <FirstProjectCategory />}
      {steps === 10 && (
        <FormSuccess
          title="Your account is ready"
          subtitle="You’ve completed the onboarding process, your news feed is ready for you. Engage your favorite projects and grow in the community "
          buttonText="Go to News feed"
          url="/feeds"
        />
      )}

    </div>
  );
};

export default SignUp;
