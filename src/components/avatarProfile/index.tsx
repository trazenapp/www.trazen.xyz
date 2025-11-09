import React from "react";
import Image from "next/image";
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
      <div className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden relative">
        <Image
          src={avatar as string || "https://github.com/shadcn.png"}
          alt="profile photo"
          fill
          className="object-cover"
        />
      </div>
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
