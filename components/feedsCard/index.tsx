import React from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { BsPatchCheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdMoreHoriz } from "react-icons/md";
import AvatarProfile from "@/components/avatarProfile";
import FeedsMedia from "../feedsMedia";
import { media } from "@/constants/feedsMedia";

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
        <Button className="!w-fit !h-fit p-0">
          <MdMoreHoriz size={36} />
        </Button>
      </div>
      <p className="text-[#F4F4F4F4] text-base font-normal font-sans line-clamp-2 md:mb-8 mb-6">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️ We’re excited to build the future of Web3 with this vibrant, creative
        community. Let’s grow together
      </p>
      <div className="overflow-hidden rounded-[12px] mb-4">
        <FeedsMedia media={media} maxVisible={4} />
      </div>
    </Card>
  );
};

export default FeedsCard;
