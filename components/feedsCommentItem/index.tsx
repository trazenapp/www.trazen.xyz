"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FeedsComment from "@/components/feedsComment";
import { MdMoreHoriz } from "react-icons/md";
import { CgFlagAlt } from "react-icons/cg";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";

const FeedsCommentItem = () => {
  const [isReply, setIsReply] = useState(false);
  const [isCommentReplied, setIsCommentReplied] = useState(false);

  const handleToggleReply = () => setIsReply(!isReply);

  return (
    <div className="border border-[#303030] gap-x-2.5 p-3.5 rounded-[10px] flex flex-col gap-y-2.5 font-sans">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2.5">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" className="" />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-x-2">
            <p className="text-[#F4F4F4F4] font-medium text-sm">Victoria325</p>
            <p className="text-[#A6A6A6] font-light text-sm">2h ago</p>
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
            align="start"
          >
            <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4">
              <CgFlagAlt color="#ddd" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative flex items-center">
        <div className="w-[34px] h-full absolute top-0 left-0 flex items-center justify-center">
          <div className="border border-[#303030] h-full w-[1px] rounded-full" />
        </div>
        <div className="flex-1 flex-col gap-y-2.5 pl-[34px]">
          <p className="text-sm font-normal">
            This is an awesome update. Congratulation on opening your amazing
            office space. it looks amazing
          </p>
          <div className="flex gap-x-2.5 mt-1">
            <Button className="!w-fit !h-fit !py-1.5 !px-4 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7]">
              <PiArrowFatUp />
              276
            </Button>
            <Button className="!w-fit !h-fit !py-1.5 !px-4 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7]">
              <PiArrowFatDown />
              276
            </Button>
            <Button
              onClick={handleToggleReply}
              className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border-0 flex gap-x-2.5 font-sans font-medium text-xs text-[#B7B7B7] shadow-none"
            >
              Reply
            </Button>
          </div>
          {isReply && <div className="mt-2.5"><FeedsComment isComment={true} /></div>}
        </div>
      </div>
    </div>
  );
};

export default FeedsCommentItem;
