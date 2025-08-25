import React from "react";
import Link from "next/link";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";

const GigsCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2.5 font-sans">
          <Avatar className="h-10 w-10 rounded-full overflow-hidden">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
              Senior Backend Developer
            </p>
            <p className="flex gap-x-1 items-center">
              <span className="text-[#A6A6A6] text-xs font-light">
                CyptoMachine
              </span>
              <BsPatchCheckFill size={12} color="#B348F9" />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button className="!w-fit !h-fit p-0">
            <FiBookmark size={36} />
          </Button>
          <p className="text-base font-light font-sans text-[#A6A6A6]">
            1 day ago
          </p>
        </div>
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
      </div>
      <p className="cursor-pointer text-[#F4F4F4F4] text-base font-normal font-sans">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️We’re excited to build the future of Web3 with this vibrant, creative
        community.Let’s grow together
      </p>
      <Link href="#" className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm text-center font-sans font-medium">
        View Details
      </Link>
    </Card>
  );
};

export default GigsCard;
