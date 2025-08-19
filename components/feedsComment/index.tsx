"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineImage } from "react-icons/md";
import { Emoji32Regular } from "@fluentui/react-icons";

const FeedsComment = () => {
  return (
    <div className="flex items-start gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Textarea
        placeholder="Add a comment"
        className="flex-1 border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm"
      />
      <Button className="!p-0 !bg-transparent">
        <MdOutlineImage />
      </Button>
      <Button className="!p-0 !bg-transparent">
        <Emoji32Regular />
      </Button>
    </div>
  );
};

export default FeedsComment;
