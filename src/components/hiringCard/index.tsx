"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/src/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosBook, IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoMdBookmark } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import { Edit, MapPin, Trash2 } from "lucide-react";
import { HiringPost } from "@/src/types/hiring.types";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import { RootState } from "@/src/redux/store";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getProjectDetail } from "@/src/redux/slices/projectSlice";
import { bookmarkHiring } from "@/src/redux/slices/hiringSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { MdMoreHoriz } from "react-icons/md";
import EditHiring from "../editHiring";
import DeleteHiring from "../deleteHiring";
import { TbFlag3 } from "react-icons/tb";

interface HiringCardProps {
  post: HiringPost;
  removeBookmark?: (bookmark_uuid: string) => void;
  isPrivate?: boolean;
  project_uuid?: string;
}

const HiringCard = ({
  post,
  removeBookmark,
  isPrivate,
  project_uuid,
}: HiringCardProps) => {
  const dispatch = useAppDispatch();
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [reportPostModal, setReportPostModal] = useState(false);

  const timeAgo = useTimeAgo(post.created_at);
  const dateTimeString = "2025-10-07T17:19:45.017Z";
  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        await dispatch(getProjectDetail(post.project_uuid)).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);

  const handleBookmark = async (post_uuid: string) => {
    if (!post_uuid) {
      console.log("No post_uuid in state");
      return;
    }

    console.log(post_uuid);

    try {
      const res = await dispatch(bookmarkHiring({ post_uuid })).unwrap();
      console.log("Bookmark response:", res);
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2.5 font-sans">
          <Avatar className="h-10 w-10 rounded-full overflow-hidden">
            <AvatarImage
              src={projectDetail?.avatar}
              className="w-full h-full"
            />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
              {post.title}
            </p>
            <p className="flex gap-x-1 items-center">
              <span className="text-[#A6A6A6] text-xs font-light">
                {projectDetail?.name}
              </span>
              <BsPatchCheckFill size={12} color="#B348F9" />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-base font-light font-sans text-[#A6A6A6]">
            {timeAgo}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="!w-fit !h-fit p-0">
                <MdMoreHoriz size={36} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#272727] !min-w-0 !p-0 border-0 w-32"
              align="end"
            >
              {isPrivate ? (
                <>
                  <DropdownMenuItem
                    onSelect={() => setEditPostModal(true)}
                    className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDeletePostModal(true)}
                    className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    <Trash2 className="text-[#FF5151]" /> Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      if (post?.is_bookmarked) {
                        if (removeBookmark && post?.bookmarks) {
                          removeBookmark(post?.bookmarks[0]?.uuid || "");
                        } else {
                          console.warn("No bookmark_uuid found for this post");
                        }
                      } else {
                        handleBookmark(post?.uuid || "");
                      }
                    }}
                    className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3"
                  >
                    {post.is_bookmarked ? (
                      <IoMdBookmark size={36} color="#430B68" />
                    ) : (
                      <FiBookmark size={36} />
                    )}{" "}
                    Bookmark
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={editPostModal} onOpenChange={setEditPostModal}>
            <DialogContent
              className="sm:w-10/12 md:w-10/12 lg:10/12 font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:!max-w-[95vw]  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b-[1px] border-b-[#383838] !h-auto">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Edit Hiring</p>
                </DialogTitle>
              </DialogHeader>
              <EditHiring post={post} />
            </DialogContent>
          </Dialog>
          <Dialog open={deletePostModal} onOpenChange={setDeletePostModal}>
            <DialogContent
              className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-5/12 lg:w-10/12 md:w-[85vw] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="sm:px-7 p-4 border-b-[1px] border-b-[#383838] !h-auto">
                <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                  <p className="max-sm:text-[16px]">Delete Hiring</p>
                </DialogTitle>
              </DialogHeader>
              <DeleteHiring post={post} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between ">
        <div className="flex flex-wrap gap-2.5">
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {post.type}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {post.experience}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {post.location}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {post.pay_range}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {post.location}
          </div>
        </div>
      </div>
      <p className="cursor-pointer text-[#F4F4F4F4] text-base font-normal font-sans line-clamp-4">
        {post.description}
      </p>
      <Link
        href={`/gigs/${post.uuid}`}
        className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm text-center font-sans font-medium"
      >
        View Details
      </Link>
    </Card>
  );
};

export default HiringCard;
