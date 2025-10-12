"use client";
import React from "react";
import Card from "@/components/card";
import { ArrowLeft } from "@solar-icons/react/ssr";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AddProjectData } from "@/types/project.types";
import FileInput from "@/components/ui/FileInput";
import InputList from "@/components/ui/InputList";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import InputFile from "@/components/ui/inputFile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnboardingData } from "@/types/auth.types";
import { chainOptions, nicheOptions } from "@/constants/options";
import FormCheckbox from "@/components/form/formCheckbox";
import { FaCheck } from "react-icons/fa6";

function EditProject() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading, steps, projectData, error } = useAppSelector(
    (state: RootState) => state.project
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddProjectData>({
    mode: "all",
    defaultValues: projectData,
  });

  const isTeamValue = watch("isTeam");

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

  return (
    <div className="xl:!ml-[20vw] w-full xl:w-[83vw] lg:w-[80vw] lg:!ml-[21vw] lg:relative">
      <div className="py-8 px-5 flex gap-4 items-center">
        <ArrowLeft
          size={20}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <span className="text-base">Edit Project</span>
      </div>
      <div className="px-5 pb-5 lg:h-[75vh] h-max">
        <form
          className="font-sans text-[#F4F4F4F4] h-full w-full space-y-10  overflow-auto scrollbar-hide"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:grid grid-cols-2 grid-rows-[repeat(4,_maxcontent)] gap-5 flex flex-col">
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="name" className="font-medium text-sm">
                Project name
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="name"
                    className="border-[#434343] rounded-[8px] py-5.5 px-4"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message || "Please enter your Project Name"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="avatar" className="font-medium text-sm">
                Project Logo
              </Label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <InputFile isImage={true} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="social" className="font-medium text-sm">
                Social url (X)
              </Label>
              <Controller
                name="social"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="social"
                    className="border-[#434343] rounded-[8px] py-5.5 px-4"
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
              <Label htmlFor="whitepaper" className="font-medium text-sm">
                Project Whitepaper
              </Label>
              <Controller
                name="whitepaper"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <InputFile onChange={field.onChange} />}
              />
              {errors.whitepaper && (
                <p className="text-red-500 text-sm">
                  {errors.whitepaper.message ||
                    "Please input a valid url or file upload"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="isTeam" className="font-medium text-sm">
                Does this project have a team?
              </Label>
              <Controller
                name="isTeam"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border-[#434343] rounded-[8px] py-5.5 px-4">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161616]">
                      <SelectGroup>
                        <SelectLabel>Select option</SelectLabel>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.isTeam && (
                <p className="text-red-500 text-sm">
                  {errors.isTeam.message ||
                    "Please select if you have a team or not"}
                </p>
              )}
            </div>

            {isTeamValue === "Yes" && (
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="isTeam" className="font-medium text-sm">
                  Team email (Max 5)
                </Label>
                <Controller
                  name="team_emails"
                  control={control}
                  rules={{
                    required:
                      isTeamValue === "Yes"
                        ? "Please enter your team emails"
                        : false,
                  }}
                  render={({ field }) => (
                    <InputList
                      value={field.value}
                      onChange={field.onChange}
                      className=""
                      maxItems={5}
                    />
                  )}
                />
                {errors.team_emails && (
                  <p className="text-red-500 text-sm">
                    {errors.team_emails.message ||
                      "Please enter your team emails"}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col col-span-2 gap-y-2">
              <Label htmlFor="description" className="font-medium text-sm">
                Project Description
              </Label>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    className="border-[#434343] rounded-[8px] py-5.5 px-4"
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description.message ||
                    "Please enter your project description"}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
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
          </div>
          <Button
            type="submit"
            className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
          >
            {loading ? (
              <ClipLoader color="#F4F4F4F4" size={20} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
