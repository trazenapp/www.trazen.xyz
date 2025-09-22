"use client"
import React from 'react'
import { useAppSelector } from "@/redux/store";
import CreateFirstProjectForm from "@/components/form/signupForm/createFirstProjectForm";
import FormSuccess from "@/components/form/formSuccess";

const CreateProject = () => {
  const { steps } = useAppSelector((state) => state.project);
  return (
    <div className="flex flex-col justify-center items-center">
      {steps === 1 && <CreateFirstProjectForm />}
      {steps === 2 && <FormSuccess
          title="Your account is awaiting approval"
          subtitle="You’ve completed the onboarding process and your account is under review. You can enjoy Trazen as an esteemed user for the meantime."
          buttonText="Go to News feed"
          url="/home"
        />}
    </div>
  )
}

export default CreateProject