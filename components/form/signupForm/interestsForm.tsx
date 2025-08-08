"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData, setSteps, setLoading } from "@/redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { SignUpData } from "@/types/auth.types";
import { chainOptions, OptionType, nicheOptions, projectOptions } from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import FormCheckbox from "@/components/form/formCheckbox";
import Select from "react-select";
import { FaCheck } from "react-icons/fa6";

const InterestsForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading, steps } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "all",
    defaultValues: data,
  });

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    dispatch(updateFormData({ ...data }));
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 3));
    }, 500);
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        <FormHeading
          title="What interests you?"
          subtitle="Select categories that you’d love to see on your news feed"
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
                values={field.value}
                onChange={field.onChange}
                selectedIcon={<FaCheck />}
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
              <FormRadio
                options={nicheOptions}
                value={field.value}
                onChange={field.onChange}
                selectedIcon={<FaCheck />}
              />
            )}
          />
          {errors.niche && (
            <p className="text-red-500 text-sm">
              {errors.niche.message || "Please select your niche"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="interests" className="font-medium text-sm">
            Popular Projects
          </Label>
          <Controller
            name="projects"
            control={control}
            render={({ field }) => (
              <FormRadio
                options={projectOptions}
                value={field.value}
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
