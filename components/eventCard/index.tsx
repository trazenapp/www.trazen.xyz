import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";
import { CgFlagAlt } from "react-icons/cg";
import { MdMoreHoriz, MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import AvatarProfile from "@/components/avatarProfile";
import { Button } from "@/components/ui/button";

const EventCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2.5 font-sans">
          <AvatarProfile />
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
      <div className="flex flex-col gap-4 justify-between ">
        <div className="flex flex-wrap gap-2.5">
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <MdOutlineCalendarMonth /> 14 Jan 2023
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <FaRegClock /> 9:00AM ET
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <IoIosTimer /> 15 days left
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            Virtual
          </div>
        </div>
        <Button className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm font-sans font-medium">
          Add to calendar
        </Button>
      </div>
      <p className="cursor-pointer text-[#F4F4F4F4] text-base font-normal font-sans">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️We’re excited to build the future of Web3 with this vibrant, creative
        community.Let’s grow together
      </p>
      <div className="flex justify-center items-center">
        <Image src="https://github.com/shadcn.png" width={350} height={350} alt="event poster" className="rounded-[12px]" />
      </div>
    </Card>
  );
};

export default EventCard;
