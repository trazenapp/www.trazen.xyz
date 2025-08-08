"use client";
import React from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateFormData, setSteps, setLoading } from "@/redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import img1 from "@/public/user-broken.svg";
import img2 from "@/public/user-id-broken.svg";
import { SignUpData } from "@/types/auth.types";

const RoleForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading, steps } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "onTouched",
    defaultValues: data,
  });

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
          title="Sign up as"
          subtitle="Choose the role you want to sign up as"
        />
      </div>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 mb-8 w-10/12 md:w-full"
            >
              <div className="flex flex-col items-end gap-y-2.5 border border-[#454545] rounded-[20px] py-6 px-5 space-x-2 in-checked:border in-checked:border-[#430B68]">
                <RadioGroupItem value="user" id="user" />
                <Label
                  htmlFor="user"
                  className="w-full flex flex-col justify-center items-center font-sans data-[state=checked]:border data-[state=checked]:border-[#430B68] group-checked:border group-checked:border-[#430B68]"
                >
                  <Image src={img1} alt="user" className="w-20 h-20" />
                  <h5 className="text-2xl font-medium mb-3">User</h5>
                  <p className="text-sm font-normal text-center">
                    Engage projects, contribute and participate on Trazen
                  </p>
                </Label>
              </div>
              <div className="flex flex-col items-end gap-y-2.5 border border-[#454545] rounded-[20px] py-6 px-5 space-x-2">
                <RadioGroupItem value="pioneer" id="pioneer" />
                <Label
                  htmlFor="user"
                  className="w-full flex flex-col justify-center items-center font-sans"
                >
                  <Image src={img2} alt="user" className="w-20 h-20" />
                  <h5 className="text-2xl font-medium mb-3 text-center">
                    Project Pioneer
                  </h5>
                  <p className="text-sm font-normal text-center">
                    Showcase Projects, Create Posts and Gain insights via
                    analytics
                  </p>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.role && <p className="text-red-500 text-sm">Role is required</p>}
        <Button
          type="submit"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold w-full md:w-6/12"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader
              color="#fff"
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default RoleForm;
