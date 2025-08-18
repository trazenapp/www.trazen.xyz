import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarProfile = () => {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="flex gap-x-1 items-center">
          <span className="font-medium text-sm md:text-base">CyptoMachine</span>
          <BsPatchCheckFill size={12} color="#B348F9" />
        </p>
        <p className="text-[#A6A6A6] text-xs font-light">1h ago</p>
      </div>
    </>
  );
};

export default AvatarProfile;
