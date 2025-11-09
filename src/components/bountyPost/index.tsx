"use client";
import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  createBounty,
  setLoading,
  resetForm,
  updateForm,
} from "@/src/redux/slices/bountiesSlice";
import { BountyItem } from "@/src/types/bounties.types";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Switch } from "../ui/switch";
import { Descendant, Node } from "slate";
import RichTextEditor from "../richTextEditor";

type BountyPostProps = {
  projectId: string;
};

function BountyPost({ projectId }: BountyPostProps) {
  const dispatch = useAppDispatch();
  const editorRef = useRef<any>(null);
  const { loading, data, error } = useAppSelector(
    (state: RootState) => state.bounties
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BountyItem>({
    defaultValues: data,
  });

  const onSubmit = async (data: any) => {
    const formData: BountyItem = {
      ...data,
      project_uuid: projectId,
      is_published: true,
    };
    try {
      dispatch(setLoading(true));
      dispatch(updateForm(data));
      await dispatch(createBounty(formData)).unwrap();
      toast(<div>Bounty created successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));

      dispatch(resetForm());
    } catch (err: any) {
      dispatch(setLoading(false));
      toast(<div>{err.message || "Failed to create bounty"}</div>, {
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
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty title
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

      {/* <div className="flex flex-col gap-2 mt-4 max-w-full">
        <Label
          htmlFor="description"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Description
        </Label>
        <Controller
          name="description"
          control={control}
          rules={{
            validate: (value) => {
              // Convert Slate nodes or plain text into a string
              const textContent = Array.isArray(value)
                ? value.map((node) => Node.string(node)).join(" ")
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
              ? safeValue.map((node) => Node.string(node)).join(" ")
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

                {/* Word counter and error message 
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
      </div> */}

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="duration"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Due When
        </Label>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <Input
              id="duration"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              {...field}
              placeholder="E.g 2 weeks"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="reward"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Reward
        </Label>
        <Controller
          name="reward"
          control={control}
          rules={{
            required: "Reward amount is required.",
            validate: (value) => {
              if (value === "") return "Reward cannot be empty.";
              const numValue = parseInt(value, 10);
              if (isNaN(numValue) || numValue < 0) {
                return "Must be a positive whole number.";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <Input
              id="reward"
              placeholder="E.g $350"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              {...field}
              onChange={(e) => {
                const rawValue = e.target.value;
                const cleanedValue = rawValue.replace(/\D/g, "");
                field.onChange(cleanedValue);
              }}
              type="tel"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="link"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty link
        </Label>
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <Input
              id="link"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              {...field}
              placeholder="E.g https://example.com/tasks"
            />
          )}
        />
      </div>

      {/* <div className="mt-4 flex flex-col gap-2 max-w-full">
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field: { value, onChange } }) => (
            <div className="flex gap-18 max-[550px]:gap-0 max-[550px]:justify-between">
              {["ONGOING", "UPCOMING", "COMPLETED"].map((type) => (
                <div key={type} className="flex gap-3 items-center">
                  <Label
                    htmlFor={type}
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => onChange(type)} // update value manually
                  >
                    <Input
                      id={type}
                      type="radio"
                      name="status"
                      value={type}
                      checked={value === type}
                      onChange={() => onChange(type)}
                      className="peer hidden"
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-[#434343] flex items-center justify-center
                      before:content-[''] before:w-2 before:h-2 before:rounded-full 
                      before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
                    ></span>
                    <p className="text-[#f4f4f4] sm:text-sm text-[12px] capitalize">
                      {type.replace("-", " ")}
                    </p>
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
      </div> */}

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
                {field.value ? "Publish bounty" : "Save as draft"}
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

export default BountyPost;
