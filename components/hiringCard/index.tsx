"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosBook, IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoMdBookmark } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { HiringPost } from "@/types/hiring.types";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProjectDetail } from "@/redux/slices/projectSlice";
import { bookmarkHiring } from "@/redux/slices/hiringSlice";

interface HiringCardProps {
  post: HiringPost;
}

const HiringCard = ({ post }: HiringCardProps) => {
  const dispatch = useAppDispatch();
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const timeAgo = useTimeAgo(post.created_at);
  const dateTimeString = "2025-10-07T17:19:45.017Z";
  console.log(post);
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
          <Button
            type="button"
            onClick={() => handleBookmark(post.uuid)}
            className="!w-fit !h-fit p-0"
          >
            {post.is_bookmarked ? <IoMdBookmark size={36} /> : <FiBookmark size={36} />}
          </Button>
          <p className="text-base font-light font-sans text-[#A6A6A6]">
            {timeAgo}
          </p>
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
