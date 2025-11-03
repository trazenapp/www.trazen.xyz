import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { CgFlagAlt } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { MdMoreHoriz, MdOutlineCalendarMonth } from "react-icons/md";
import { LuVolumeX } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import AvatarProfile from "../avatarProfile";
import Card from "../card";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";

const NotificationCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-y-2.5">
          <div className="flex items-center gap-x-2.5 font-sans">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col md:flex-row gap-x-2.5">
              <p className="flex gap-x-1 items-center">
                <span className="font-medium text-sm md:text-base">
                  CyptoMachine
                </span>
                <BsPatchCheckFill size={12} color="#B348F9" />
              </p>
              <p className="flex gap-x-1 items-center font-medium text-sm md:text-base">
                posted a new announcement
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-x-2.5 font-sans">
            <p className="font-medium text-xs text-[#f4f4f4]">14 July 2025</p>
            <p className="font-medium text-xs text-[#f4f4f4] flex gap-x-2 items-center"><FaRegClock /> 15 days left</p>
          </div>
        </div>
        <div className="flex">
          <p className="text-[#A6A6A6] text-xs font-light font-sans">1h ago</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="!w-fit !h-fit p-0">
                <MdMoreHoriz size={36} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#272727] !min-w-0 !p-0 border-0 rounded-[6px]"
              align="end"
            >
              <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4 hover:outline-0">
                <LuVolumeX color="#ddd" /> Mute
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-fit flex items-center gap-x-2.5 py-2.5 px-4 hover:outline-0">
                <IoCheckmark color="#ddd" /> Mark as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="cursor-pointer text-[#F4F4F4F4] text-base font-normal font-sans">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️We’re excited to build the future of Web3 with this vibrant, creative
        community.Let’s grow together
      </p>
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
      </div>
    </Card>
  );
};

export default NotificationCard;
