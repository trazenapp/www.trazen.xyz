"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/src/components/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { CgFlagAlt } from "react-icons/cg";
import { MdMoreHoriz, MdOutlineCalendarMonth } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import AvatarProfile from "@/src/components/avatarProfile";
import { Button } from "@/src/components/ui/button";
import { EventsItem } from "@/src/types/event.types";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import { useGoogleCalendarLink } from "@/src/hooks/useGoogleCalendarLink";
import EditEvent from "../EditEvent";
import DeleteEvent from "../deleteEvent";
import ReportEvent from "../reportEvent";
import { Edit, Trash2 } from "lucide-react";
import { ProjectDetail } from "@/src/types/project.types";
import { useFormattedDate } from "@/src/hooks/useFormattedDate";
import { useFormattedTime } from "@/src/hooks/useFormattedTime";

interface EventCardProps {
  event: EventsItem;
  isPrivate?: boolean;
  project?: ProjectDetail;
}

const EventCard = ({ event, isPrivate, project }: EventCardProps) => {
  const [editEventModal, setEditEventModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [reportEventModal, setReportEventModal] = useState(false);

  const dateString = event?.date_time?.toString();
  const [datePart, timePartRaw] = dateString.split("T");
  const timePart = timePartRaw.replace("Z", "").split(".")[0];
  const timeAgoText = useTimeAgo(event?.date_time);
  const formatDate = useFormattedDate(datePart);
  const formatTime = useFormattedTime(timePart);
  const googleCalendarLink = useGoogleCalendarLink(
    event?.title,
    event?.date_time,
    60,
    event?.description,
    event?.location
  );
  return (
    <Card className="md:px-[23px]! md:py-5! p-3! flex flex-col gap-y-5 rounded-2xl! border-0!">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2.5 font-sans">
          <Link href="/profile" className="flex items-start gap-x-2.5">
            {!isPrivate ? (
              <AvatarProfile
                createdAt={event?.created_at}
                name={event?.project?.name}
                avatar={event?.project?.avatar as string}
                is_approved={event?.project?.is_approved}
              />
            ) : (
              <AvatarProfile
                createdAt={project?.created_at}
                name={project?.name}
                avatar={project?.avatar}
                is_approved={project?.is_approved}
              />
            )}
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-fit! h-fit! p-0">
              <TfiMoreAlt size={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#272727] min-w-0! p-0! border-0 w-32"
            align="end"
          >
            {isPrivate === true ? (
              <>
                <DropdownMenuItem
                  onSelect={() => setEditEventModal(true)}
                  className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                >
                  <Edit size={12} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setDeleteEventModal(true)}
                  className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
                >
                  <Trash2 size={12} className="text-[#FF5151]" /> Delete
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                onSelect={() => setReportEventModal(true)}
                className="text-[#ddd] font-sans font-normal text-xs w-full! flex items-center gap-x-2.5 py-2.5 px-3"
              >
                <CgFlagAlt color="#ddd" /> Report
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={editEventModal} onOpenChange={setEditEventModal}>
          <DialogContent
            className="sm:w-10/12 md:w-10/12 lg:10/12 font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:max-w-[95vw]!  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
              <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                <p className="max-sm:text-[16px]">Edit Post</p>
              </DialogTitle>
            </DialogHeader>
            <EditEvent post={event} />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteEventModal} onOpenChange={setDeleteEventModal}>
          <DialogContent
            className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-5/12 lg:w-10/12 md:w-[85vw] overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
              <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                <p className="max-sm:text-[16px]">Delete Post</p>
              </DialogTitle>
            </DialogHeader>
            <DeleteEvent post={event} />
          </DialogContent>
        </Dialog>
        <Dialog open={reportEventModal} onOpenChange={setReportEventModal}>
          <DialogContent
            className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-7/12 lg:w-10/12 md:w-[85vw] overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <DialogHeader className="sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
              <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                <p className="max-sm:text-[16px]">Report Post</p>
              </DialogTitle>
            </DialogHeader>
            <ReportEvent post={event} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 justify-between ">
        <div className="flex flex-wrap gap-2.5">
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <MdOutlineCalendarMonth /> {formatDate}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <FaRegClock /> {formatTime}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
            <IoIosTimer /> {timeAgoText}
          </div>
          <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize!">
            {event.type}
          </div>
          {(event?.type === "HYBRID" || event?.type === "ONSITE") &&<div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize!">
            {event?.location}
          </div>}
        </div>
      </div>
      <h4 className="text-[#f4f4f4] text-base font-medium font-sans">{event?.title}</h4>
      <p className="text-[#F4F4F4F4] text-sm font-normal font-sans line-clamp-3">
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
