"use client";
import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  createHiring,
  setLoading,
  updateForm,
} from "@/src/redux/slices/hiringSlice";
import { HiringPostPayload } from "@/src/types/hiring.types";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Descendant, Node as SlateNode } from "slate";
import RichTextEditor from "../richTextEditor";
import { ReactEditor } from "slate-react";

type HiringPostProps = {
  projectId: string;
};

function HiringPost({ projectId }: HiringPostProps) {
  const dispatch = useAppDispatch();
  const editorRef = useRef<ReactEditor | null>(null);
  const { loading, data, error } = useAppSelector(
    (state: RootState) => state.hiring
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<HiringPostPayload>({
    defaultValues: data,
  });
  const values = watch();

  const onSubmit = async (data: any) => {
    const formData: HiringPostPayload = {
      ...data,
      project_uuid: projectId,
      location:
        values.type === "Onsite" || values.type === "Hybrid"
          ? values.location
          : values.location_type,
      is_published: true,
      status: "ONGOING",
    };
    console.log(formData);
    try {
      dispatch(setLoading(true));
      dispatch(updateForm(data));
      await dispatch(createHiring(formData)).unwrap();
      toast(<div>Hiring post created successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      resetField("title");
      resetField("description");
      resetField("experience");
      resetField("type");
      resetField("location");
      resetField("location_type");
      resetField("is_published");
      resetField("pay_range");
    } catch (err: any) {
      dispatch(setLoading(false));
      toast(<div>{err.message || "Failed to create hiring"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="title"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job title
        </Label>
        <Controller
          name="title"
          control={control}
          rules={{
            validate: (value) => {
              const wordCount = value?.trim().split(/\s+/).length || 0;
              return wordCount <= 10 || "Title must not exceed 10 words";
            },
          }}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <Input
                id="title"
                placeholder="Enter event title"
                className="border-[#434343] text-xs! text-[#f4f4f4] font-light h-11 focus-visible:border-[#434343]! focus-visible:ring-[0]!"
                {...field}
              />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="description"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Job description
        </Label>
        <Controller
          name="description"
          control={control}
          rules={{
            validate: (value) => {
              // Convert Slate nodes or plain text into a string
              const textContent = Array.isArray(value)
                ? value.map((node) => SlateNode.string(node)).join(" ")
                : typeof value === "string"
                  ? value
                  : "";

              const wordCount = textContent
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;

              if (wordCount === 0) return "Content required";
              if (wordCount > 160)
                return "Description must not exceed 160 words";

              return true;
            },
          }}
          render={({ field, fieldState }) => {
            const safeValue: Descendant[] = Array.isArray(field.value)
              ? field.value
              : [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text:
                          typeof field.value === "string" ? field.value : "",
                      },
                    ],
                  },
                ];

            // Get current word count for live display
            const textContent = Array.isArray(safeValue)
              ? safeValue.map((node) => SlateNode.string(node)).join(" ")
              : "";
            const wordCount = textContent
              .trim()
              .split(/\s+/)
              .filter(Boolean).length;

            return (
              <div className="w-full">
                <RichTextEditor
                  description={safeValue}
                  setDescription={(val) => field.onChange(val)}
                  editorRef={editorRef}
                />

                {/* Word counter and error message */}
                <div className="flex justify-between mt-1 text-xs">
                  <span
                    className={`${
                      wordCount > 160 ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {wordCount} / 160 words
                  </span>
                  {fieldState.error && (
                    <span className="text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="type"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job type
        </Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="group font-sans w-full py-5 px-4 border-[#434343] text-[#f4f4f4] text-sm">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent className="font-sans bg-[#161616] border-[#303030]">
                <SelectGroup className="w-full">
                  <SelectLabel className="text-[#f4f4f4] text-[16px]" />
                  {["contract", "full-time", "internship", "volunteer"].map(
                    (v) => (
                      <SelectItem
                        key={v}
                        value={v}
                        className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                      >
                        {v.charAt(0).toUpperCase() +
                          v.slice(1).replace("-", " ")}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="experience"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Experience level
        </Label>
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full py-5 px-4 border-[#434343] text-[#f4f4f4] text-sm">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent className="bg-[#161616] border-[#303030]">
                <SelectGroup>
                  <SelectLabel className="text-[#f4f4f4] text-base" />
                  {[
                    { value: "entry", label: "Entry" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "expert", label: "Expert" },
                    { value: "none", label: "None" },
                  ].map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-[#bcbcbc] text-xs focus:bg-[#303030] focus:text-white"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 max-w-full">
        <Controller
          name="location_type"
          control={control}
          rules={{ required: "Location type is required" }}
          render={({ field: { value, onChange } }) => (
            <div className="flex gap-18 max-[550px]:gap-0 max-[550px]:justify-between">
              {["Remote", "Onsite", "Hybrid"].map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <Label
                    htmlFor={item}
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => onChange(item)} // update value manually
                  >
                    <Input
                      id={item}
                      type="radio"
                      name="location_type"
                      value={item}
                      checked={value === item}
                      onChange={() => onChange(item)}
                      className="peer hidden"
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-[#434343] flex items-center justify-center
                      before:content-[''] before:w-2 before:h-2 before:rounded-full 
                      before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
                    ></span>
                    <p className="text-[#f4f4f4] sm:text-sm text-[12px] capitalize">
                      {item.replace("-", " ")}
                    </p>
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      {(values.location_type === "Onsite" ||
        values.location_type === "Hybrid") && (
        <div className="mt-4 flex flex-col gap-2">
          <Label
            htmlFor="location"
            className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
          >
            Job location
          </Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="location"
                name="name"
                placeholder="Example: New York, USA"
                className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              />
            )}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="pay_range"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Payment
        </Label>
        <Controller
          name="pay_range"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="pay_range"
              name="pay_range"
              placeholder="Example: $60,000 - $80,000"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="link"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Application link
        </Label>
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="link"
              name="link"
              placeholder="Enter external job link"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
            />
          )}
        />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 my-2.5 rounded-md">
        <Controller
          name="is_published"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <Label className="text-sm text-gray-400">
                {field.value ? "Publish hiring post" : "Save as draft"}
              </Label>
            </>
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#430B68] py-4 rounded-full w-[130px] text-sm my-3"
      >
        {loading ? <ClipLoader size={16} color="#fff" /> : "Post"}
      </Button>
    </form>
  );
}

export default HiringPost;
