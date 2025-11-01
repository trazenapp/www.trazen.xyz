"use client";
import React from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateFormData,
  setSteps,
  setLoading,
} from "@/redux/slices/onboardingSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { OnboardingData } from "@/types/auth.types";
import { options, hearOptions, OptionType } from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import Select from "react-select";
import { FaCheck } from "react-icons/fa6";

const settingUpForm = () => {
  const dispatch = useAppDispatch();
  const { loading, steps, data, error } = useAppSelector(
    (state: RootState) => state.onboarding
  );
  const user = useAppSelector((state: RootState) => state.register.user);

  const userRole = user?.role;

  const formTitle =
    userRole === "USER" ? "Almost Done" : "Tell us more about yourself";
  const formSubTitle =
    userRole === "USER"
      ? "Fill out the following to proceed"
      : "This helps us know how best the platform will suit your needs";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingData>({
    mode: "all",
    defaultValues: data,
  });

  const xUrlCheck = (value: string) => {
    if (!value) return value;

    let handle = value.trim();

    if (handle.startsWith("https://") && handle.includes("@@")) {
      handle = handle.replace("@@", "@");
    }

    if (!handle.startsWith("http")) {
      handle = handle.replace(/^@/, ""); // remove leading @ if present
      return `https://x.com/@${handle}`;
    }

    handle = handle
      .replace("https://twitter.com/", "https://x.com/")
      .replace("https://mobile.twitter.com/", "https://x.com/");

    const extractedUsername = handle.split(/@/).pop();
    return `https://x.com/@${extractedUsername}`;
  };

  const onSubmit = (data: OnboardingData) => {
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
          title={formTitle}
          subtitle={formSubTitle}
          className="text-left!"
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
          <Input
            type="text"
            id="username"
            className="border-[#434343] rounded-[8px] py-[19px] px-4"
            value={user?.username}
            disabled
          />
        </div>
        {userRole === "PIONEER" && (
          <>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="social" className="font-medium text-sm">
                X(Twitter) handle
              </Label>
              <Controller
                name="social"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    const url = xUrlCheck(value || "");
                    const regexCheck =
                      /^https:\/\/x\.com\/@([A-Za-z0-9_]{1,15})$/;

                    return regexCheck.test(url)
                      ? true
                      : "Invalid URL: Use format https://x.com/username or use a valid X(Twitter) username";
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="social"
                    className="border-[#434343] rounded-[8px] py-[19px] px-4"
                    {...field}
                  />
                )}
              />
              {errors.social && (
                <p className="text-red-500 text-sm">
                  {errors.social.message ||
                    "Please enter your X(Twitter) handle"}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="title" className="font-medium text-sm">
                What is your title?
              </Label>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="title"
                    className="border-[#434343] rounded-[8px] py-[19px] px-4"
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message || "Please enter your title"}
                </p>
              )}
            </div>
          </>
        )}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="skills" className="font-medium text-sm">
            Add skills <span className="opacity-30">(Max. 5)</span>
          </Label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select<OptionType, true>
                isMulti
                options={options as OptionType[]}
                className="basic-multi-select font-sans bg-[#171717]! border-[#434343]!"
                classNamePrefix="select"
                isOptionDisabled={() => field.value?.length >= 5}
                value={options.filter((opt) =>
                  (field.value ?? []).includes(opt.value)
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((s) => s.value))
                }
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
          <Label htmlFor="ref" className="font-medium text-sm">
            How did your hear about us
          </Label>
          <Controller
            name="ref"
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

          {errors.ref && (
            <p className="text-red-500 text-sm">Referral is required</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Continue"}
        </Button>
      </form>
    </Card>
  );
};

export default settingUpForm;
