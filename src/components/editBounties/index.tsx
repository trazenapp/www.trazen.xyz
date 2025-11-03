import React from 'react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  setLoading,
  resetForm,
  editBounties,
} from "@/src/redux/slices/bountiesSlice";
import { BountyItem, BountyItemResponse } from "@/src/types/bounties.types";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Switch } from "../ui/switch";

interface EditBountiesProps {
  post?: BountyItemResponse;
}

const EditBounties = ({ post }: EditBountiesProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.bounties
  );
  const editBountiesData = {
    project_uuid: post?.project_uuid || "",
    is_published: post?.is_published,
    title: post?.title,
    description: post?.description,
    duration: post?.duration,
    reward: post?.reward,
    link: post?.link,
    status: post?.status,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BountyItem>({
    defaultValues: editBountiesData,
  });

  const onSubmit = async (data: any) => {
    const formData: BountyItem = {
      ...data,
      project_uuid: post?.project_uuid,
    };
    console.log(formData, post?.uuid);
    try {
      dispatch(setLoading(true));
      await dispatch(editBounties({ task_uuid: post?.uuid || "", data: formData })).unwrap();
      toast(<div>Bounty edited successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      dispatch(resetForm());
    } catch (err: any) {
      dispatch(setLoading(false));
      toast(<div>{err.message || "Failed to edit bounty"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
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
          render={({ field }) => (
            <Input
              id="title"
              className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              {...field}
              placeholder="Enter bounty title"
            />
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
          render={({ field }) => (
            <Textarea
              {...field}
              className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              placeholder="Enter bounty description"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="duration"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Duration
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
          render={({ field }) => (
            <Input
              id="reward"
              placeholder="E.g $350"
              className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
              {...field}
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
                    onClick={() => onChange(type)} 
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
  )
}

export default EditBounties