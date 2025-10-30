"use client";
import React from "react";
import { useAppSelector, useAppDispatch, RootState } from "@/redux/store";
import CreateFirstProjectForm from "@/components/form/signupForm/createFirstProjectForm";
import FormSuccess from "@/components/form/formSuccess";
import PricingPlan from "@/components/pricing/pricingPlan";
import ProjectCategory from "@/components/form/signupForm/projectCategory";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStepsGuard from "@/hooks/useAuthStepsGuard";
import { setSteps } from "@/redux/slices/projectSlice";

const CreateProject = () => {
  useAuthStepsGuard(3);
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((state: RootState) => state.project);
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
      {steps === 1 && <CreateFirstProjectForm />}
      {steps === 2 && <ProjectCategory />}
      {steps === 3 && <PricingPlan />}
      {steps === 4 && (
        <FormSuccess
          title="Your account is awaiting approval"
          subtitle="You’ve completed the onboarding process and your account is under review. You can enjoy Trazen as an esteemed user for the meantime."
          buttonText="Go to News feed"
          url="/home"
        />
      )}
    </div>
  );
};

export default CreateProject;
