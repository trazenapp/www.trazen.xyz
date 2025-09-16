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
import { options, hearOptions, OptionType } from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import Select from "react-select";
import { FaCheck } from "react-icons/fa6";

const settingUpForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading, steps, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  console.log(data?.role)

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
      dispatch(setSteps(steps + 1));
    }, 500);
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        <FormHeading
          title="Almost Done"
          subtitle="Fill out the following to proceed"
          className="!text-left"
        />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="username" className="font-medium text-sm">
            Username
          </Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                id="username"
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="username" className="font-medium text-sm">
            Username
          </Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                id="username"
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="username" className="font-medium text-sm">
            Username
          </Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                id="username"
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="skills" className="font-medium text-sm">
            Add skills <span className="opacity-30">(Max. 5)</span>
          </Label>
          <Controller
            name="skills"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select<OptionType, true>
                isMulti
                options={options as OptionType[]}
                className="basic-multi-select font-sans !bg-[#171717] !border-[#434343]"
                classNamePrefix="select"
                isOptionDisabled={() => field.value?.length >= 5}
                {...field}
              />
            )}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">
              {errors.skills.message || "Please select your skills"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="interests" className="font-medium text-sm">
            How did your hear about us
          </Label>
          <Controller
            name="hearAboutUs"
            control={control}
            render={({ field }) => (
              <FormRadio
                options={hearOptions}
                value={field.value}
                onChange={field.onChange}
                selectedIcon={<FaCheck />}
              />
            )}
          />

          {errors.role && (
            <p className="text-red-500 text-sm">Role is required</p>
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

export default settingUpForm;
