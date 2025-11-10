"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { TfiMoreAlt } from "react-icons/tfi";
import { CgFlagAlt } from "react-icons/cg";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import { CommentItem, PostItem } from "@/src/types/post.types";
import {
  voteOnComment,
  fetchComments,
} from "@/src/redux/slices/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { toast } from "react-hot-toast";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import { useInView } from "react-intersection-observer";
import FeedsCommentForm from "../feedsCommentForm";

interface FeedsCommentItemProps {
  comment: CommentItem;
  details?: PostItem;
  level?: number;
}

const FeedsCommentItem = ({
  comment,
  details,
  level = 1,
}: FeedsCommentItemProps) => {
  const dispatch = useAppDispatch();
  const { postDetails, loading, error, comments, pagination, hasMore } =
    useAppSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const timeAgoText = useTimeAgo(comment?.created_at);
  const fallbackStr = comment?.user?.username
    ? [
        comment?.user?.username[0].toUpperCase(),
        comment?.user?.username[comment?.user?.username.length - 1],
      ]
    : [];


  // useEffect(() => {
  //     setPage(1);
  //     dispatch(fetchComments({ comment_uuid: comment?.uuid as string, page: 1, limit: 10 }));
  //   }, [dispatch]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev: number) => {
        const nextPage = prev + 1;
        dispatch(
          fetchComments({
            comment_uuid: comment?.uuid as string,
            page: nextPage,
            limit: pagination.limit,
          })
        );
        return nextPage;
      });
    }
  }, [inView, hasMore, dispatch, page, pagination.limit, loading]);


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
      toast.success((t) => <div>{res.message}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      console.log("Vote response:", res);
    } catch (error: any) {
      console.error("Vote error:", error);
      toast.error((t) => <div>{error}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
    }
  };

  const canReply = level < 2;
  const childComments = Array.isArray(comment?.comments)
    ? comment.comments
    : [];

  return (
    <div className="border border-[#303030] gap-x-2.5 p-3.5 rounded-[10px] flex flex-col gap-y-2.5 font-sans">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2.5">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={comment?.user?.avatar as string}
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
            <Button className="w-fit! h-fit! p-0">
              <TfiMoreAlt size={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#272727] min-w-0! p-0! border-0"
            align="end"
          >
            <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs w-fit! flex items-center gap-x-2.5 py-2.5 px-4">
              <CgFlagAlt color="#ddd" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative flex flex-col gap-y-3 justify-center">
        <div className="w-6 h-full absolute top-0 left-0 flex items-center justify-center">
          <div className="border border-[#303030] h-full w-px rounded-full" />
        </div>
        <div className="flex-1 flex-col gap-y-3 pl-[34px]">
          <p className="text-xs font-normal mb-4">{comment.content}</p>
          <div className={`flex flex-col gap-x-2.5  ${childComments.length > 0 &&
              level < 2 && "my-3"}`}>
            <div
              className={`flex justify-end gap-x-2.5 overflow-x-scroll md:overflow-x-hidden mb-4 ${childComments.length > 0 &&
              level < 2 && "mb-4"}`}
              style={{ scrollbarWidth: "none" }}
            >
              <Button
                onClick={() =>
                  comment?.uuid && handleVote("UPVOTE", comment.uuid)
                }
                className={`w-fit! h-fit! py-1.5! px-3! rounded-full ${comment?.voteStatus === "UPVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-[10px] hover:bg-[#430B68]`}
              >
                <PiArrowFatUp />
                {comment?.upvoteCount}
              </Button>
              <Button
                onClick={() =>
                  comment?.uuid && handleVote("DOWNVOTE", comment.uuid)
                }
                className={`h-fit! py-1.5! px-3! rounded-full ${comment?.voteStatus === "DOWNVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-[10px] hover:bg-[#430B68]`}
              >
                <PiArrowFatDown />
                {comment?.downvoteCount}
              </Button>
            </div>
            {childComments.length > 0 &&
              level < 2 &&
              childComments.map((item) => {
                return (
                  <div className="not-last:mb-4">
                    <FeedsCommentItem
                      key={item.uuid}
                      comment={item}
                      details={postDetails}
                      level={level + 1}
                    />
                  </div>
                );
              })}
            {canReply && (
              <FeedsCommentForm
                parentCommentUuid={comment?.uuid}
                postUuid={postDetails?.uuid}
                postAuthor={postDetails?.avatar}
                placeholder="Write a comment..."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedsCommentItem;
