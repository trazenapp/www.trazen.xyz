"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setSteps,
  setLoading,
  onboarding,
} from "@/redux/slices/onboardingSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { OnboardingData } from "@/types/auth.types";
import {
  chainOptions,
  nicheOptions,
  projectOptions,
} from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import FormCheckbox from "@/components/form/formCheckbox";
import FormSuccess from "@/components/form/formSuccess";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const InterestsForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, steps, data, error } = useAppSelector(
    (state: RootState) => state.onboarding
  );
  const user = useAppSelector((state: RootState) => state.register.user);

  const userRole = user?.role ?? "";
  const userEmail = user?.email ?? "";
  const uUsername = user?.username ?? "";

  const formTitle =
    userRole === "USER" ? "What interests you?" : "Project Category";
  const formSubTitle =
    userRole === "USER"
      ? "Select categories that you’d love to see on your news feed"
      : "Select what applies to your project";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingData>({
    mode: "all",
    defaultValues: data,
  });

  const finalData = (formData: any) => {
    return {
      email: userEmail,
      username: uUsername,
      title: formData.title,
      social: formData.social,
      skills: formData.skills,
      interests: [
        ...(formData.chains || []),
        ...(formData.niche || []),
        ...(formData.projects ? [formData.projects] : []),
      ],
      ref: formData.ref,
    };
  };

  const onSubmit = async (data: OnboardingData) => {
    try {
      dispatch(setLoading(true));
      const finalFormData = finalData(data);
      const mergedData = { ...finalFormData };
      console.log(mergedData);
      dispatch(updateFormData(mergedData));
      await dispatch(onboarding(mergedData)).unwrap();
      toast.success((t) => <div>Onboarding Steps Complete</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setLoading(false));
      userRole === "USER"
        ? dispatch(setSteps(steps + 1))
        : router.push("/create-project");
    } catch (error: any) {
      console.log(error);
      toast.error((t) => <div>{error}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        <FormHeading
          title={formTitle}
          subtitle={formSubTitle}
          className="!text-left"
        />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="username" className="font-medium text-sm">
            Chains
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
                maxSelected={userRole === "PIONEER" ? 3 : undefined}
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
            Niche
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
                maxSelected={userRole === "PIONEER" ? 3 : undefined}
              />
            )}
          />
          {errors.niche && (
            <p className="text-red-500 text-sm">
              {errors.niche.message || "Please select your niche"}
            </p>
          )}
        </div>
        {userRole === "USER" && (
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="interests" className="font-medium text-sm">
              Popular Projects
            </Label>
            <Controller
              name="projects"
              control={control}
              render={({ field }) => (
                <FormCheckbox
                  options={projectOptions}
                  values={field.value || []}
                  onChange={field.onChange}
                  selectedIcon={<FaCheck />}
                />
              )}
            />
            {errors.projects && (
              <p className="text-red-500 text-sm">
                {errors.projects.message || "Please select your projects"}
              </p>
            )}
          </div>
        )}
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

export default InterestsForm;
