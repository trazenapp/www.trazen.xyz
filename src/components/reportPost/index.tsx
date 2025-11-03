import React, { useState } from "react";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { CircleCheck } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/src/components/ui/toggle-group";
import { Post, PostItem, ReportItem } from "@/src/types/post.types";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { reportPost, setLoading } from "@/src/redux/slices/postSlice";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";

interface ReportPostProps {
  post?: PostItem;
}

const ReportPost = ({ post }: ReportPostProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { reportData, error } = useAppSelector(
    (state: RootState) => state.post
  );
  const {profile} = useAppSelector((state: RootState) => state.user)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportItem>({
    defaultValues: reportData,
  });

  const onSubmit = async (data: ReportItem) => {
    try {
      setLoading(true);
      await dispatch(
        reportPost({ post_uuid: post?.uuid as string, data: data })
      ).unwrap();
      toast(<div>Post Reported successfully</div>, {
        theme: "dark",
        type: "success",
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast(<div>{err.message || "Failed to report post"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };
  return (
    <form
      className="px-4 py-4 flex flex-col gap-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-xl font-normal font-sans">Username: {profile?.username}</p>
      <div className="flex flex-col gap-y-2 w-full">
        <Controller
          name="reason"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            // <div className="w-9/12">
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              size="sm"
              className="flex flex-wrap gap-2.5"
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
            >
              {["SCAM", "FAKE", "INAPPROPRIATE", "MISLEADING", "OTHER"].map(
                (item) => {
                  const isSelected = field.value === item;
                  return (
                    <ToggleGroupItem
                      key={item}
                      value={item}
                      aria-label={`Toggle ${item}`}
                      className="px-3 py-2.5 gap-x-2.5 text-xs font-normal border-[#303030] data-[state=on]:bg-[#FF0000] data-[state=on]:text-white"
                    >
                      {item}
                      {isSelected ? <BsFillCheckCircleFill /> : <BsCircle />}
                    </ToggleGroupItem>
                  );
                }
              )}
            </ToggleGroup>
            // </div>
          )}
        />
        {errors.reason && (
          <p className="text-red-500 text-sm">
            {errors.reason.message || "Please select if you have a team or not"}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <Controller
          name="details"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              id="description"
              className="border-[#434343] rounded-[8px] py-[19px] px-4"
              {...field}
              placeholder="Type your reason here"
            />
          )}
        />
        {errors.details && (
          <p className="text-red-500 text-sm">
            {errors?.details.message || "Please give us more details"}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold !w-fit ml-auto"
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Submit Report"}
      </Button>
    </form>
  );
};

export default ReportPost;
