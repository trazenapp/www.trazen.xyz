"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/src/components/card";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { TfiMoreAlt } from "react-icons/tfi";
import AvatarProfile from "@/src/components/avatarProfile";
import FeedsMedia from "../feedsMedia";
import FeedsComment from "../feedsComment";
import {
  PiArrowFatUp,
  PiArrowFatDown,
  PiBookmarkSimpleBold,
  PiBookmarkSimpleFill,
} from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbShare3, TbFlag3 } from "react-icons/tb";
import { Edit, Trash2 } from "lucide-react";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  votePost,
  setLoading,
  bookmarkPost,
  followPost,
} from "@/src/redux/slices/postSlice";
import { PostItem } from "@/src/types/post.types";
import { ProjectDetail } from "@/src/types/project.types";
import { useShare } from "@/src/hooks/useShareOptions";
import EditPost from "../editPost";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import DeletePost from "../deletePost";
import ReportPost from "../reportPost";
import { BsPatchCheckFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";

interface FeedsCardProps {
  post?: PostItem;
  removeBookmark?: (bookmark_uuid: string) => void;
  isPrivate?: boolean;
  project?: ProjectDetail;
  isBookmarked?: boolean;
}

const FeedsCard = ({
  post,
  removeBookmark,
  isPrivate,
  project,
  isBookmarked = false,
}: FeedsCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shareContent } = useShare();
  const { loading } = useAppSelector((state: RootState) => state.post);

  const [voteStatus, setVoteStatus] = useState(post?.voteStatus);
  const [isFollowing, setIsFollowing] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(post?.upvoteCount);
  const [downVoteCount, setDownVoteCount] = useState(post?.downvoteCount);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [reportPostModal, setReportPostModal] = useState(false);

  const handlePageClick = (slug: string) => {
    router.push(`/home/${slug}`);
  };

  const handleShareClick = () => {
    shareContent({
      title: post?.name || "",
      text: post?.content || "",
      url: post?.uuid || "",
    });
  };

  // vote post
  const handleVote = async (
    voteType: "UPVOTE" | "DOWNVOTE",
    post_uuid: string
  ) => {
    if (!post_uuid) {
      console.warn("No post_uuid in state");
      return;
    }

    let prevUpvotes = upVoteCount || 0;
    let prevDownvotes = downVoteCount || 0;
    const prevStatus = voteStatus;

    let newUpvotes = prevUpvotes;
    let newDownvotes = prevDownvotes;
    let newStatus = prevStatus;

    if (voteType === "UPVOTE") {
      if (prevStatus === "UPVOTE") {
        newUpvotes -= 1;
        newStatus = null;
      } else {
        newUpvotes += 1;
        if (prevStatus === "DOWNVOTE") newDownvotes -= 1;
        newStatus = "UPVOTE";
      }
    } else if (voteType === "DOWNVOTE") {
      if (prevStatus === "DOWNVOTE") {
        newDownvotes -= 1;
        newStatus = null;
      } else {
        newDownvotes += 1;
        if (prevStatus === "UPVOTE") newUpvotes -= 1;
        newStatus = "DOWNVOTE";
      }
    }

    setUpVoteCount(newUpvotes);
    setDownVoteCount(newDownvotes);
    setVoteStatus(newStatus);

    try {
      const res = await dispatch(votePost({ voteType, post_uuid })).unwrap();

      setUpVoteCount(res?.upvoteCount ?? newUpvotes);
      setDownVoteCount(res?.downvoteCount ?? newDownvotes);
      setVoteStatus(res?.voteStatus ?? newStatus);
    } catch (error) {
      console.error("Vote error:", error);

      setUpVoteCount(prevUpvotes);
      setDownVoteCount(prevDownvotes);
      setVoteStatus(prevStatus);
    }
  };

  // bookmark post
  const handleBookmark = async (post_uuid: string) => {
    if (!post_uuid) {
      console.log("No post_uuid in state");
      return;
    }

    try {
      const res = await dispatch(bookmarkPost({ post_uuid })).unwrap();
      console.log("Bookmark response:", res);
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  // follow post
  const handleFollowPost = async (project_uuid: string) => {
    if (isFollowing) return;
    setIsFollowing(true);

    try {
      const res = await dispatch(followPost({ project_uuid })).unwrap();
      console.log("Follow response:", res);
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  return (
    <>
      <Card className="md:px-[23px]! md:py-5! p-3! flex flex-col gap-y-5 rounded-2xl! border-0! mb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-x-2.5 font-sans">
            {!isPrivate ? (
              <AvatarProfile
                createdAt={post?.created_at}
                name={post?.project?.name}
                avatar={post?.project?.avatar}
                is_approved={post?.project?.is_approved}
              />
            ) : (
              <AvatarProfile
                createdAt={project?.created_at}
                name={project?.name}
                avatar={project?.avatar}
                is_approved={project?.is_approved}
              />
            )}
            {isPrivate || post?.isFollowing ? (
              <BsPatchCheckFill color="#430B68" className="mt-1" />
            ) : (
              <Button
                type="button"
                onClick={() =>
                  post?.project_uuid && handleFollowPost(post?.project_uuid)
                }
                className="py-1! px-2.5! text-[#DDDDDD]! rounded-full text-[10px]"
              >
                <CiCirclePlus />
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-fit! h-fit! p-0">
                <TfiMoreAlt size={64} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#272727] min-w-0! p-0! border-0 w-32"
              align="end"
            >
              <DropdownMenuItem
                onClick={handleShareClick}
                className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
              >
                <TbShare3 /> Share
              </DropdownMenuItem>

              {isPrivate ? (
                <>
                  <DropdownMenuItem
                    onSelect={() => setEditPostModal(true)}
                    className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDeletePostModal(true)}
                    className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    <Trash2 className="text-[#FF5151]" /> Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onSelect={() => setReportPostModal(true)}
                    className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    <TbFlag3 /> Report
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (post?.isBookmarked) {
                        if (removeBookmark && post?.bookmarks) {
                          removeBookmark(post?.bookmarks[0]?.uuid || "");
                        } else {
                          console.warn("No bookmark_uuid found for this post");
                        }
                      } else {
                        handleBookmark(post?.uuid || "");
                      }
                    }}
                    className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    {post?.isBookmarked ? (
                      <PiBookmarkSimpleFill color="#430B68" />
                    ) : (
                      <PiBookmarkSimpleBold />
                    )}{" "}
                    Bookmark
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={editPostModal} onOpenChange={setEditPostModal}>
            <DialogContent
              className="sm:w-10/12 md:w-10/12 lg:10/12 font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:max-w-[95vw]!  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Edit Post</p>
                </DialogTitle>
              </DialogHeader>
              <EditPost post={post} />
            </DialogContent>
          </Dialog>
          <Dialog open={deletePostModal} onOpenChange={setDeletePostModal}>
            <DialogContent
              className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-5/12 lg:w-10/12 md:w-[85vw] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Delete Post</p>
                </DialogTitle>
              </DialogHeader>
              <DeletePost post={post} />
            </DialogContent>
          </Dialog>
          <Dialog open={reportPostModal} onOpenChange={setReportPostModal}>
            <DialogContent
              className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-7/12 lg:w-10/12 md:w-[85vw] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Report Post</p>
                </DialogTitle>
              </DialogHeader>
              <ReportPost post={post} />
            </DialogContent>
          </Dialog>
        </div>
        <p
          onClick={() => handlePageClick(post?.uuid || "")}
          className="cursor-pointer text-[#F4F4F4F4] text-sm font-normal font-sans line-clamp-2"
        >
          {post?.content}
        </p>
        <div className="overflow-hidden rounded-[12px] w-full">
          <FeedsMedia media={post?.medias} maxVisible={4} />
        </div>
        {isBookmarked && isPrivate && (
          <>
            <div
              className="flex justify-between gap-x-2.5 overflow-x-scroll md:overflow-x-hidden border"
              style={{ scrollbarWidth: "none" }}
            >
              <Button
                onClick={() => handleVote("UPVOTE", post?.uuid || "")}
                className={`flex-1 h-fit! py-1.5! px-6! rounded-full ${voteStatus === "UPVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]`}
              >
                <PiArrowFatUp />
                {upVoteCount}
                {upVoteCount === 1 ? (
                  <span className="hidden md:flex"> Upvote</span>
                ) : (
                  <span className="hidden md:flex"> Upvotes</span>
                )}
              </Button>
              <Button
                onClick={() => handleVote("DOWNVOTE", post?.uuid || "")}
                className={`flex-1 h-fit! py-1.5! px-6! rounded-full ${voteStatus === "DOWNVOTE" ? "border border-[#430B68] bg-[#430B68]" : "border border-[#303030]"} flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]`}
              >
                <PiArrowFatDown />
                {downVoteCount}
                {downVoteCount === 1 ? (
                  <span className="hidden md:flex"> Downvote</span>
                ) : (
                  <span className="hidden md:flex"> Downvotes</span>
                )}
              </Button>
              <Button
                onClick={() => router.push(`/home/${post?.uuid || ""}`)}
                className="flex-1 h-fit! py-1.5! px-6! rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]"
              >
                <IoChatbubbleOutline />
                {post?.commentCount}
                {post?.commentCount === 1 ? (
                  <span className="hidden md:flex"> Comment</span>
                ) : (
                  <span className="hidden md:flex"> Comments</span>
                )}
              </Button>
            </div>
            <FeedsComment post={post} />
          </>
        )}
      </Card>
    </>
  );
};

export default FeedsCard;
