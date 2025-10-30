"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/card";
import { MdMoreHoriz, MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import img from "@/public/cryptocurrency-usdc.svg";
import { BountyItemResponse } from "@/types/bounties.types";
import { useVisitedLinks } from "@/hooks/useVisitedLinks";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import EditBounties from "../editBounties";
import DeleteBounties from "../deleteBounties";

interface BountyCardProps {
  bounty?: BountyItemResponse;
  isPrivate?: boolean;
}

const BountyCard = ({ bounty, isPrivate }: BountyCardProps) => {
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const avatarUrl =
    bounty?.project?.user?.avatar || "https://github.com/shadcn.png";
  const { isVisited, markVisited } = useVisitedLinks();
  const visited = bounty?.link ? isVisited(bounty.link) : false;
  return (
    <Link
      href={bounty?.link || ""}
      target="_blank"
      onClick={() => markVisited(bounty?.link || "")}
      className={`${visited ? "opacity-50" : "opacity-100"} transition-opacity`}
    >
      <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0 ">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-x-3.5 font-sans w-11/12">
            <Avatar className="h-[60px] w-[60px] rounded-full overflow-hidden">
              <AvatarImage src={avatarUrl} className="object-cover w-full" />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm md:text-base text-[#f4f4f4] line-clamp-1">
                {bounty?.title}
              </p>
              <p className="flex gap-x-1 items-center">
                <span className="text-[#A6A6A6] text-xs font-light">
                  {bounty?.project?.user?.username}
                </span>
                {bounty?.project.is_approved && (
                  <BsPatchCheckFill size={12} color="#B348F9" />
                )}
              </p>
              <div className="flex gap-x-1 items-center text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
                <IoIosTimer />{" "}
                {bounty?.status === "ONGOING" && `${bounty?.duration} left`}
                {bounty?.status === "UPCOMING" &&
                  `Starts in ${bounty?.duration}`}
                {bounty?.status === "COMPLETED" && "Completed"}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-start gap-x-2 w-[17%]">
            <Image src={img} alt="usdc icon" className="w-5 h-5" />
            <p className="text-base font-light font-sans text-[#A6A6A6] line-clamp-1">
              {bounty?.reward}
            </p>
            {isPrivate && (
              <>
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={editPostModal} onOpenChange={setEditPostModal}>
                  <DialogContent
                    className="sm:w-10/12 md:w-10/12 lg:10/12 font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:!max-w-[95vw]  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <DialogHeader className="sm:px-7 p-4 border-b-[1px] border-b-[#383838] !h-auto">
                      <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                        <p className="max-sm:text-[16px]">Edit Bounties</p>
                      </DialogTitle>
                    </DialogHeader>
                    <EditBounties post={bounty} />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={deletePostModal}
                  onOpenChange={setDeletePostModal}
                >
                  <DialogContent
                    className="font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-5/12 lg:w-10/12 md:w-[85vw] overflow-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <DialogHeader className="sm:px-7 p-4 border-b-[1px] border-b-[#383838] !h-auto">
                      <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4]">
                        <p className="max-sm:text-[16px]">Delete Post</p>
                      </DialogTitle>
                    </DialogHeader>
                    <DeleteBounties post={bounty} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BountyCard;
