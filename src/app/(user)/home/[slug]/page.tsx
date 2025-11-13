"use client";
import React, { useEffect, use, useState } from "react";
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
import FeedsMedia from "@/src/components/feedsMedia";
import FeedsComment from "@/src/components/feedsComment";
import { media } from "@/src/constants/feedsMedia";
import {
  PiArrowFatUp,
  PiArrowFatDown,
  PiBookmarkSimpleBold,
  PiBookmarkSimpleFill,
} from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbFlag3, TbShare3 } from "react-icons/tb";
import { CgFlagAlt } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa6";
import FeedsCommentItem from "@/src/components/feedsCommentItem";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  votePost,
  setLoading,
  bookmarkPost,
  followPost,
  fetchPostDetails,
} from "@/src/redux/slices/postSlice";
import { deleteBookmark } from "@/src/redux/slices/bookmarkSlice";
import { useShare } from "@/src/hooks/useShareOptions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import ReportPost from "@/src/components/reportPost";
import { Badge } from "@/src/components/ui/badge";
import { BsPatchCheckFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const router = useRouter();
  const { postDetails, loading, pagination, hasMore } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const { shareContent } = useShare();

  const [voteStatus, setVoteStatus] = useState(postDetails?.voteStatus);
  const [isFollowing, setIsFollowing] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(postDetails?.upvoteCount);
  const [downVoteCount, setDownVoteCount] = useState(
    postDetails?.downvoteCount
  );
  const [reportPostModal, setReportPostModal] = useState(false);

  console.log(postDetails?.voteStatus, upVoteCount, downVoteCount);

  useEffect(() => {
    dispatch(fetchPostDetails({ post_uuid: slug }));
  }, [dispatch, slug]);

  const handleShareClick = () => {
    shareContent({
      title: postDetails?.name || "",
      text: postDetails?.content || "",
      url: window.location.href,
    });
  };

  // vote post
  const handleVote = async (
    voteType: "UPVOTE" | "DOWNVOTE",
    post_uuid: string
  ) => {
    const prevUp = upVoteCount ?? 0;
    const prevDown = downVoteCount ?? 0;
    const prevStatus = voteStatus ?? null;

    let newStatus: "UPVOTE" | "DOWNVOTE" | null = voteType;
    if (prevStatus === voteType) {
      newStatus = null;
    }

    let calculatedUp = prevUp;
    let calculatedDown = prevDown;

    if (voteType === "UPVOTE") {
      calculatedUp = prevStatus === "UPVOTE" ? prevUp - 1 : prevUp + 1;
      if (prevStatus === "DOWNVOTE") {
        calculatedDown = prevDown - 1;
      }
    } else {
      calculatedDown = prevStatus === "DOWNVOTE" ? prevDown - 1 : prevDown + 1;
      if (prevStatus === "UPVOTE") {
        calculatedUp = prevUp - 1;
      }
    }

    setVoteStatus(newStatus);
    setUpVoteCount(calculatedUp);
    setDownVoteCount(calculatedDown);

    try {
      await dispatch(votePost({ voteType, post_uuid })).unwrap();
    } catch (error) {
      setVoteStatus(prevStatus);
      setUpVoteCount(prevUp);
      setDownVoteCount(prevDown);
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

  // delete bookmark
  const handleDeleteBookmark = async (bookmark_uuid: string) => {
    console.log("hello world");
    if (!bookmark_uuid) {
      console.log("No bookmark_uuid in state");
      return;
    }

    try {
      const res = await dispatch(deleteBookmark({ bookmark_uuid })).unwrap();
      console.log("Delete bookmark response:", res);
    } catch (error) {
      console.error("Delete bookmark error:", error);
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

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex items-center gap-x-6 font-sans mb-4">
        <Button onClick={router.back} className="border-0 bg-transparent">
          <FaArrowLeft />
        </Button>
        <div className="flex gap-x-2.5">
          <p className="text-[#f4f4f4] text-sm font-medium">Post</p>
          {/* <p className="text-[#7F7F7F] text-xl font-light">1.2k views</p> */}
        </div>
      </div>
      <Card className="md:px-[23px]! md:py-5! p-3! flex flex-col gap-y-5 rounded-2xl! border-0!">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-x-2.5 font-sans">
            <Link href="/profile" className="flex items-start gap-x-2.5">
              <AvatarProfile
                createdAt={postDetails?.created_at}
                name={postDetails?.project?.name}
                avatar={postDetails?.project?.avatar}
                is_approved={postDetails?.project?.is_approved}
              />
            </Link>

            {postDetails?.isFollowing ? (
              <BsPatchCheckFill color="#430B68" className="mt-1" />
            ) : (
              <Button
                type="button"
                onClick={() =>
                  postDetails?.project_uuid &&
                  handleFollowPost(postDetails?.project_uuid)
                }
                className="p-1! text-[#DDDDDD]! rounded-full text-[10px]"
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
              <DropdownMenuItem
                onClick={() => {
                  if (postDetails?.isBookmarked) {
                    if (handleDeleteBookmark && postDetails?.bookmarks) {
                      handleDeleteBookmark(
                        postDetails?.bookmarks[0]?.uuid || ""
                      );
                    } else {
                      console.warn("No bookmark_uuid found for this post");
                    }
                  } else {
                    handleBookmark(postDetails?.uuid || "");
                  }
                }}
                className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
              >
                {postDetails?.isBookmarked ? (
                  <PiBookmarkSimpleFill color="#430B68" />
                ) : (
                  <PiBookmarkSimpleBold />
                )}{" "}
                Bookmark
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setReportPostModal(true)}
                className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
              >
                <TbFlag3 /> Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={reportPostModal} onOpenChange={setReportPostModal}>
            <DialogContent
              className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-8/12 lg:w-10/12 md:w-[85vw] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Report Post</p>
                </DialogTitle>
              </DialogHeader>
              <ReportPost post={postDetails} />
            </DialogContent>
          </Dialog>
        </div>
        <p className="cursor-pointer text-[#F4F4F4F4] text-sm  font-normal font-sans">
          {postDetails?.content}
        </p>
        <div className="overflow-hidden rounded-[12px]">
          <FeedsMedia media={postDetails?.medias as string[]} maxVisible={4} />
        </div>
        <div
          className="flex justify-between gap-x-2.5 overflow-x-scroll md:overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <Button
            onClick={() => handleVote("UPVOTE", postDetails?.uuid || "")}
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
            onClick={() => handleVote("DOWNVOTE", postDetails?.uuid || "")}
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
          <Button className="flex-1 h-fit! py-1.5! px-6! rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm hover:bg-[#430B68]">
            <IoChatbubbleOutline />
            {postDetails?.commentCount}
            {postDetails?.commentCount === 1 ? (
              <span className="hidden md:flex"> Comment</span>
            ) : (
              <span className="hidden md:flex"> Comments</span>
            )}
          </Button>
        </div>
        <FeedsComment uuid={postDetails?.uuid} post={postDetails} />
        <div className="flex flex-col gap-y-5">
          {postDetails?.comments?.map((comment) => (
            <FeedsCommentItem
              key={comment.uuid}
              comment={comment}
              details={postDetails}
            />
          ))}
        </div>
      </Card>
    </>
  );
};

export default Page;
