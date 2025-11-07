import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { NotificationItem } from "@/src/types/notifications.types";
import Card from "../card";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";

interface NotificationCardProps {
  notification?: NotificationItem;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
    const timeAgoText = useTimeAgo(notification?.created_at);
    const title = notification?.title || "";
    const fallbackStr = title
      ? [title[0].toUpperCase(), title[title.length - 1]]
      : [];

  return (
    <Card className="md:px-[23px]! md:py-5! p-3! flex flex-col gap-y-5 rounded-2xl! border-0!">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-x-2.5 font-sans">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col md:flex-row gap-x-2.5 w-full">
              <p className="flex gap-x-1 items-center w-full line-clamp-1">
                <span className="font-medium text-sm">
                {notification?.message}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="text-[#A6A6A6] text-[10px] font-light font-sans">{timeAgoText}</p>
        </div>
      </div>
      {/* <p className="cursor-pointer text-[#F4F4F4F4] text-sm font-normal font-sans">
        Big news: We’ve officially opened our first office in New Orleans!
        ⚜️We’re excited to build the future of Web3 with this vibrant, creative
        community.Let’s grow together
      </p> */}
    </Card>
  );
};

export default NotificationCard;

