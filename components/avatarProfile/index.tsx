import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProfileProps {
  createdAt?: string;
  name?: string;
  avatar?: string;
  is_approved?: boolean;
}

const AvatarProfile = ({ createdAt, name, avatar, is_approved }: AvatarProfileProps) => {
  function timeAgo(pastTimeStr) {
  const pastTime = new Date(pastTimeStr);
  const currentTime = new Date();

  const timeDifferenceMs = currentTime.getTime() - pastTime.getTime();

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;

  // 1. Check Seconds
  if (timeDifferenceMs < MS_PER_MINUTE) {
    const seconds = Math.round(timeDifferenceMs / MS_PER_SECOND);
    return seconds <= 1 ? "1 second ago" : `${seconds} seconds ago`;
  }

  // 2. Check Minutes
  if (timeDifferenceMs < MS_PER_HOUR) {
    const minutes = Math.round(timeDifferenceMs / MS_PER_MINUTE);
    return minutes <= 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }

  // 3. Check Hours (the default unit if greater than an hour)
  if (timeDifferenceMs >= MS_PER_HOUR) {
    const hours = Math.round(timeDifferenceMs / MS_PER_HOUR);
    return hours <= 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  // Fallback for future times or error
  return "just now";
}

const dateString = String(createdAt);
const result = `${timeAgo(dateString)}`;

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
        <p className="text-[#A6A6A6] text-xs font-light">{result}</p>
      </div>
    </>
  );
};

export default AvatarProfile;
