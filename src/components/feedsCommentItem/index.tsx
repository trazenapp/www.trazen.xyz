"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import FeedsComment from "@/src/components/feedsComment";
import { MdMoreHoriz } from "react-icons/md";
import { CgFlagAlt } from "react-icons/cg";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import { CommentItem, PostItem } from "@/src/types/post.types";
import { Textarea } from "@/src/components/ui/textarea";
import { MdOutlineImage } from "react-icons/md";
import { useFileUpload } from "@/src/utils/uploadPostMedia";
import {
  commentOnPost,
  commentOnComment,
  voteOnComment,
} from "@/src/redux/slices/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import Picker, { Theme } from "emoji-picker-react";
import { Emoji32Regular } from "@fluentui/react-icons";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import AvatarProfile from "../avatarProfile";

interface FeedsCommentItemProps {
  comment: CommentItem;
  postDetails?: PostItem;
}

const FeedsCommentItem = ({ comment, postDetails }: FeedsCommentItemProps) => {
  const dispatch = useAppDispatch();
  const [isReply, setIsReply] = useState(false);
  const [isCommentReplied, setIsCommentReplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeAgoText = useTimeAgo(comment?.created_at);
  const fallbackStr = comment?.user?.username
    ? [
        comment?.user?.username[0].toUpperCase(),
        comment?.user?.username[comment?.user?.username.length - 1],
      ]
    : [];

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const values = watch();

  const handleToggleReply = () => setIsReply(!isReply);

  const handleVote = async (
    voteType: "UPVOTE" | "DOWNVOTE",
    post_uuid: string
  ) => {
    if (!post_uuid) {
      console.log("No post_uuid in state");
      return;
    }

    try {
      const res = await dispatch(
        voteOnComment({ voteType, comment_uuid: comment?.uuid as string })
      ).unwrap();
      console.log("Vote response:", res);
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(comment?.uuid, data);
    setIsLoading(true);
    if (!data.content.trim()) return;
    try {
      const res = await dispatch(
        commentOnComment({
          comment_uuid: comment?.uuid as string,
          content: data.content,
        })
      ).unwrap();
      console.log("Comment success:", res);
      // setComment(""); // reset
      setIsLoading(false);
      toast.success((t) => <div>Comment added successfully</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      resetField("content");
    } catch (err: any) {
      toast.error((t) => <div>{err.message || "Failed to add comment"}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      console.error("Comment failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-[#303030] gap-x-2.5 p-3.5 rounded-[10px] flex flex-col gap-y-2.5 font-sans">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2.5">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={comment?.user?.avatar || "https://github.com/shadcn.png"}
              className=""
            />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              {fallbackStr}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-x-2">
            <p className="text-[#F4F4F4F4] font-medium text-sm">
              {comment?.user?.username}
            </p>
            <p className="text-[#A6A6A6] font-light text-[10px]">
              {timeAgoText}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="!w-fit !h-fit p-0">
              <MdMoreHoriz size={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#272727] !min-w-0 !p-0 border-0"
            align="end"
          >
            <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4">
              <CgFlagAlt color="#ddd" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative flex flex-col gap-y-3 justify-center">
        <div className="w-[34px] h-full absolute top-0 left-0 flex items-center justify-center">
          <div className="border border-[#303030] h-full w-px rounded-full" />
        </div>
        <div className="flex-1 flex-col gap-y-3 pl-[34px]">
          <p className="text-xs font-normal">{comment.content}</p>
          <div className="flex flex-col gap-x-2.5 my-3">
            <div
              className="flex gap-x-2.5 overflow-x-scroll md:overflow-x-hidden"
              style={{ scrollbarWidth: "none" }}
            >
              <Button
                onClick={() =>
                  comment?.uuid && handleVote("UPVOTE", comment.uuid)
                }
                className={`w-fit! h-fit! py-1.5! px-6! rounded-full ${comment?.voteStatus === "UPVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]`}
              >
                <PiArrowFatUp />
                {comment?.upvoteCount}
              </Button>
              <Button
                onClick={() =>
                  comment?.uuid && handleVote("DOWNVOTE", comment.uuid)
                }
                className={`h-fit! py-1.5! px-6! rounded-full ${comment?.voteStatus === "DOWNVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]`}
              >
                <PiArrowFatDown />
                {comment?.downvoteCount}
              </Button>
              <Button
                onClick={handleToggleReply}
                className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border-0 flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7] shadow-none"
              >
                Reply
              </Button>
            </div>
            {isReply && (
              <div className="mt-2.5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex items-start gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5"
                >
                  <div className="flex flex-col gap-y-2.5">
                    <Avatar>
                      <AvatarImage
                        src={
                          postDetails?.avatar || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-x-1.5">
                      <Button className="p-0! bg-transparent!">
                        <MdOutlineImage />
                      </Button>
                      <Button className="!p-0 !bg-transparent">
                        <Emoji32Regular />
                      </Button>
                    </div>
                  </div>

                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Add a comment"
                        className="flex-1 border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm"
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    className="text-[#f4f4f4] text-light text-xs font-sans px-4 py-1.5 rounded-[6px] bg-[#430B68] hover:bg-[#430B68]"
                  >
                    {isLoading ? (
                      <ClipLoader color="#F4F4F4F4" size={10} />
                    ) : (
                      "Post"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {Array.isArray(comment?.comments) &&
        comment.comments.map((item) => {
          const timeAgoText = useTimeAgo(item?.created_at);
          const title = item?.user?.username;
          const fallbackStr = title
            ? [title[0].toUpperCase(), title[title.length - 1]]
            : [];
          return (
            <React.Fragment key={item.uuid}>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2.5">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={
                        item?.user?.avatar || "https://github.com/shadcn.png"
                      }
                      className=""
                    />
                    <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                      {fallbackStr}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-x-2">
                    <p className="text-[#F4F4F4F4] font-medium text-sm">
                      {item?.user?.username}
                    </p>
                    <p className="text-[#A6A6A6] font-light text-[10px]">
                      {timeAgoText}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="!w-fit !h-fit p-0">
                      <MdMoreHoriz size={36} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-[#272727] !min-w-0 !p-0 border-0"
                    align="end"
                  >
                    <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4">
                      <CgFlagAlt color="#ddd" /> Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative flex items-center">
                <div className="w-[34px] h-full absolute top-0 left-0 flex items-center justify-center">
                  <div className="border border-[#303030] h-full w-px rounded-full" />
                </div>
                <div className="flex-1 flex-col gap-y-2.5 pl-[34px]">
                  <p className="text-sm font-normal">{item.content}</p>
                  <div className="flex gap-x-2.5 mt-1">
                    {/* <Button
                  onClick={() =>
                    comment?.uuid && handleVote("UPVOTE", item.uuid)
                  }
                  className="!w-fit !h-fit !py-1.5 !px-4 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7]"
                >
                  <PiArrowFatUp />0
                </Button>
                <Button
                  onClick={() =>
                    comment?.uuid && handleVote("DOWNVOTE", item.uuid)
                  }
                  className="!w-fit !h-fit !py-1.5 !px-4 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7]"
                >
                  <PiArrowFatDown />0
                </Button> */}
                    {/* <Button
                  onClick={handleToggleReply}
                  className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border-0 flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7] shadow-none"
                >
                  Reply
                </Button> */}
                  </div>
                  {/* {isReply && (
                <div className="mt-2.5">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-start gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5"
                  >
                    <div className="flex flex-col gap-y-2.5">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-x-1.5">
                        <Button className="!p-0 !bg-transparent">
                          <MdOutlineImage />
                        </Button>
                        <Button className="!p-0 !bg-transparent">
                          <Emoji32Regular />
                        </Button>
                      </div>
                    </div>

                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Add a comment"
                          className="flex-1 border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm"
                          {...field}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      className="text-[#f4f4f4] text-light text-xs font-sans px-4 py-1.5 rounded-[6px] bg-[#430B68] hover:bg-[#430B68]"
                    >
                      {isLoading ? (
                        <ClipLoader color="#F4F4F4F4" size={10} />
                      ) : (
                        "Post"
                      )}
                    </Button>
                  </form>
                </div>
              )} */}
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default FeedsCommentItem;
