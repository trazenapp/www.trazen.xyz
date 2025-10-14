"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setSteps,
  setLoading,
  addProject,
} from "@/redux/slices/projectSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { OnboardingData } from "@/types/auth.types";
import { chainOptions, nicheOptions } from "@/constants/options";
import FormCheckbox from "@/components/form/formCheckbox";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProjectCategory = () => {
  const dispatch = useAppDispatch();
  const { loading, steps, projectData, error } = useAppSelector(
    (state: RootState) => state.project
  );
  const user = useAppSelector((state: RootState) => state.register.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingData>({
    mode: "all",
    defaultValues: projectData,
  });

  const finalData = (formData: any) => {
    return {
      name: formData.name,
      description: formData.description,
      avatar: formData.avatar,
      social: formData.social,
      whitepaper: formData.whitepaper,
      categories: [...(formData.chains || []), ...(formData.niche || [])],
      team_emails: formData.team_emails,
    };
  };

  const onSubmit = async (data: OnboardingData) => {
    try {
      dispatch(setLoading(true));
      const finalFormData = finalData(data);
      const mergedData = { ...finalFormData };
      console.log(mergedData);
      dispatch(updateFormData(mergedData));
      await dispatch(addProject(mergedData)).unwrap();
      toast(<div>Project created successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    } catch (error: any) {
      console.log(error);
      toast(<div>{error}</div>, {
        theme: "dark",
        type: "error",
      });
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        <FormHeading
          title="Project Category"
          subtitle="Select what applies to your project"
          className="!text-left"
        />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="username" className="font-medium text-sm">
            Chains (Max. 3)
          </Label>
          <Controller
            name="chains"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormCheckbox
                options={chainOptions}
                values={field.value || []}
                onChange={field.onChange}
                selectedIcon={<FaCheck />}
                maxSelected={3}
              />
            )}
          />
          {errors.chains && (
            <p className="text-red-500 text-sm">
              {errors.chains.message || "Please select your chains"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="skills" className="font-medium text-sm">
            Niche (Max. 3)
          </Label>
          <Controller
            name="niche"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormCheckbox
                options={nicheOptions}
                values={field.value || []}
                onChange={field.onChange}
                selectedIcon={<FaCheck />}
                maxSelected={3}
              />
            )}
          />
          {errors.niche && (
            <p className="text-red-500 text-sm">
              {errors.niche.message || "Please select your niche"}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Continue"}
        </Button>
      </form>
    </Card>
  );
};

export default ProjectCategory;
