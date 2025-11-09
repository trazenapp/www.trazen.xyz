"use client";
import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  createEvent,
  setLoading,
  updateForm,
} from "@/src/redux/slices/eventSlice";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import FileInput from "@/src/components/ui/FileInput";
import { CreateEventPayload } from "@/src/types/event.types";
import { Switch } from "../ui/switch";
import { Descendant, Node } from "slate";
import RichTextEditor from "../richTextEditor";
import { ReactEditor } from "slate-react";

type EventPostProps = {
  projectId: string;
};

function EventsPost({ projectId }: EventPostProps) {
  const dispatch = useAppDispatch();
  const editorRef = useRef<ReactEditor | null>(null);
  const { loading, data, error } = useAppSelector(
    (state: RootState) => state.events
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<CreateEventPayload>({
    defaultValues: data,
  });
  const values = watch();

  const onSubmit = async (data: any) => {
    const formData: CreateEventPayload = {
      ...data,
      project_uuid: projectId,
      cover_image: data.cover_image,
      location:
        values.type === "ONSITE" || values.type === "HYBRID"
          ? values.location
          : values.type,
      is_published: true,
      status: data.status,
      date_time: new Date(data.date_time).toISOString(),
    };
    console.log(formData);
    try {
      dispatch(setLoading(true));
      dispatch(updateForm(data));
      await dispatch(createEvent(formData)).unwrap();
      toast(<div>Event created successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      resetField("title");
      resetField("description");
      resetField("date_time");
      resetField("type");
      resetField("location");
      resetField("is_published");
      resetField("cover_image");
    } catch (err: any) {
      dispatch(setLoading(false));
      toast(<div>{err.message || "Failed to create event"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex flex-col gap-2 mt-4 max-w-full">
        <Label
          htmlFor="title"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Title
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
      <div className="flex flex-col gap-2 mt-4 max-w-full">
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

      <div className="w-5/12 mt-4 flex flex-col gap-2">
        <Label
          htmlFor="startTime"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Start Time
        </Label>
        <Controller
          name="date_time"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="dateTime"
              type="datetime-local"
              className="border-[#434343] text-xs! text-[#f4f4f4] font-light h-11 focus-visible:border-[#434343]! focus-visible:ring-[0]!"
              placeholder="Select date"
            />
          )}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 max-w-full">
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field: { value, onChange } }) => (
            <div className="flex gap-18 max-[550px]:gap-0 max-[550px]:justify-between">
              {["ONSITE", "VIRTUAL", "HYBRID"].map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <Label
                    htmlFor={item}
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => onChange(item)} // update value manually
                  >
                    <Input
                      id={item}
                      type="radio"
                      name="event_type"
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

      {(values.type === "ONSITE" || values.type === "HYBRID") && (
        <div className="flex flex-col gap-2 mt-4 max-w-full">
          <Label
            htmlFor="location"
            className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
          >
            Location
          </Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                id="location"
                className="border-[#434343] text-xs! text-[#f4f4f4] font-light h-11 focus-visible:border-[#434343]! focus-visible:ring-[0]!"
                {...field}
              />
            )}
          />
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 max-w-full">
        <Label
          htmlFor="coverImage"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Cover Image
        </Label>
        <Controller
          name="cover_image"
          control={control}
          render={({ field }) => (
            <FileInput value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 max-w-full">
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
                {field.value ? "Publish event" : "Save as draft"}
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

export default EventsPost;
