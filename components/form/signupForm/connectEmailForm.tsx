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

const ConnectEmailForm = () => {
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

  const skipStep = () => {
      dispatch(setSteps(steps + 2));
  };

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    dispatch(updateFormData({...data}));
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    }, 500);
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Connect Email"
          subtitle="Enter your email to easily recover your account"
        />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="email" className="font-medium text-sm">
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                placeholder="example@email.com"
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
        >
          {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Continue"}
        </Button>
        <p className="text-center font-light text-base">
          Not ready? {" "}<Button onClick={skipStep} className="font-medium p-0">Skip</Button>
        </p>
      </form>
    </Card>
  );
};

export default ConnectEmailForm;
