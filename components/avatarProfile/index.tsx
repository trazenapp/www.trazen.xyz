import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTimeAgo } from "@/hooks/useTimeAgo";

interface AvatarProfileProps {
  createdAt?: string;
  name?: string;
  avatar?: string;
  is_approved?: boolean;
}

const AvatarProfile = ({
  createdAt,
  name,
  avatar,
  is_approved,
}: AvatarProfileProps) => {
  const timeAgoText = useTimeAgo(createdAt);

  return (
    <>
      <Avatar>
        <AvatarImage src={avatar} />
        {/* <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
          CN
        </AvatarFallback> */}
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
