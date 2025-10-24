"use client";
import React from "react";
import Image from "next/image";
// import Link from "next/link";
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
import { EventsItem } from "@/types/event.types";
import { useTimeRemaining } from "@/hooks/useTimeRemaining";
import { useGoogleCalendarLink } from "@/hooks/useGoogleCalendarLink";

interface EventCardProps {
  event: EventsItem;
  isPrivate?: boolean
}

const EventCard = ({ event, isPrivate }: EventCardProps) => {
  const dateString = event?.date_time?.toString();
  const [datePart, timePartRaw] = dateString.split("T");
  const timePart = timePartRaw.replace("Z", "").split(".")[0];
  const timeRemaining = useTimeRemaining(event?.date_time);
  const googleCalendarLink = useGoogleCalendarLink(
    event?.title,
    event?.date_time,
    60,
    event?.description,
    event?.location
  );
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2.5 font-sans">
          <AvatarProfile
            createdAt={event.created_at}
            name={event?.project?.user?.username}
            avatar={
              (event?.project?.user?.avatar as string) ||
              "https://github.com/shadcn.png"
            }
            is_approved={event?.project?.is_approved}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="!w-fit !h-fit p-0">
              <MdMoreHoriz size={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#272727] !min-w-0 !p-0 border-0"
            align="end"
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
            <MdOutlineCalendarMonth /> {datePart}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <FaRegClock /> {timePart}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <IoIosTimer /> {timeRemaining}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            {event.type}
          </div>
        </div>
      </div>
      <p className="cursor-pointer text-[#F4F4F4F4] text-base font-normal font-sans line-clamp-3">
        {event.description}
      </p>
      <div className="flex justify-center items-center h-[350px]">
        <Image
          src={event.cover_image as string}
          width={350}
          height={150}
          alt="event poster"
          className="rounded-[12px] w-full h-full object-cover"
        />
      </div>
      <a
        href={googleCalendarLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm font-sans font-medium"
      >
        Add to calendar
      </a>
    </Card>
  );
};

export default EventCard;
