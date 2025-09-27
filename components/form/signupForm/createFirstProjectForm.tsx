import React from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileInput from "@/components/ui/FileInput";
import InputFile from "@/components/ui/inputFile";
import InputList from "@/components/ui/InputList";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { AddProjectData } from "@/types/project.types";
import { toast } from "react-toastify";

const CreateFirstProjectForm = () => {
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

  const onSubmit = async (data: AddProjectData) => {
    try {
      console.log(data);
      dispatch(updateFormData({ ...data }));
      dispatch(setLoading(true));
      dispatch(setLoading(false));
      dispatch(setSteps(steps + 1));
    } catch (error: any) {
      console.log(error);
      toast(<div>{error}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        <FormHeading
          title="Create your First Project"
          subtitle="Enter the details of the project you want to list below"
          className="!text-left"
        />
      </div>
      <form
        className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
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
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
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
                className="border-[#434343] rounded-[8px] py-[19px] px-4"
                {...field}
              />
            )}
          />
          {errors.social && (
            <p className="text-red-500 text-sm">
              {errors.social.message || "Please enter your X(Twitter) handle"}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full border-[#434343] rounded-[8px] py-[19px] px-4">
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
                {errors.team_emails.message || "Please enter your team emails"}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="avatar" className="font-medium text-sm">
            Project Logo
          </Label>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <FileInput value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm">
              {errors.avatar.message ||
                "Please input a valid url or file upload"}
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

export default CreateFirstProjectForm;
