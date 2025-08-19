import React from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdMoreHoriz } from "react-icons/md";
import AvatarProfile from "@/components/avatarProfile";
import FeedsMedia from "../feedsMedia";
import FeedsComment from "../feedsComment";
import { media } from "@/constants/feedsMedia";
import {
  PiArrowFatUp,
  PiArrowFatDown,
  PiBookmarkSimpleBold,
} from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbShare3 } from "react-icons/tb";
import { CgFlagAlt } from "react-icons/cg";

const FeedsCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <div className="flex items-start gap-x-2.5 font-sans">
          <AvatarProfile />
          <Button className="!py-1 !px-2.5 border !border-[#DDDDDD] !text-[#DDDDDD] rounded-full text-[10px]">
            Follow
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="!w-fit !h-fit p-0">
              <MdMoreHoriz size={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#272727] !min-w-0 !p-0 border-0" align="start">
            <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4"><CgFlagAlt color="#ddd" /> Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-[#F4F4F4F4] text-base font-normal font-sans line-clamp-2 md:mb-8 mb-6">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️ We’re excited to build the future of Web3 with this vibrant, creative
        community. Let’s grow together
      </p>
      <div className="overflow-hidden rounded-[12px] mb-4">
        <FeedsMedia media={media} maxVisible={4} />
      </div>
      <div className="flex justify-between mb-5">
        <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
          <PiArrowFatUp />
          276
        </Button>
        <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
          <PiArrowFatDown />
          276
        </Button>
        <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
          <IoChatbubbleOutline />
          276
        </Button>
        <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
          <TbShare3 />
          276
        </Button>
        <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
          <PiBookmarkSimpleBold />
          276
        </Button>
      </div>
      <FeedsComment />
    </Card>
  );
};

export default FeedsCard;
