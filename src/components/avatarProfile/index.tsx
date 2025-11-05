import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import ProfilePhoto from "../profilePhoto";

interface AvatarProfileProps {
  createdAt?: string;
  name?: string;
  avatar?: string;
  is_approved?: boolean;
  title?: string;
}

const AvatarProfile = ({
  createdAt,
  name,
  avatar,
  is_approved,
  title,
}: AvatarProfileProps) => {
  const timeAgoText = useTimeAgo(createdAt);
  const fallbackStr = title
    ? [title[0].toUpperCase(), title[title.length - 1]]
    : [];

  return (
    <>
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={avatar ? avatar : "https://github.com/shadcn.png"}
          className="h-full w-full"
        />
        <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
          {fallbackStr.map((i) => i)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="flex gap-x-1 items-center">
          <span className="font-medium text-sm md:text-base">{name}</span>
          {is_approved && <BsPatchCheckFill size={12} color="#B348F9" />}
        </p>
        <p className="text-[#A6A6A6] text-xs font-light">{timeAgoText}</p>
      </div>
    </>
  );
};

export default AvatarProfile;
