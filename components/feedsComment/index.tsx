"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineImage } from "react-icons/md";
import { Emoji32Regular } from "@fluentui/react-icons";

interface FeedsCommmentProps {
  isComment: boolean;
}

const FeedsComment = ({ isComment = false }: FeedsCommmentProps) => {
  return (
    <div className="flex items-start gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5">
      <div className="flex flex-col gap-y-2.5"><Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
          CN
        </AvatarFallback>
      </Avatar>
      {isComment && (
        <div className="flex gap-x-1.5">
          <Button className="!p-0 !bg-transparent">
            <MdOutlineImage />
          </Button>
          <Button className="!p-0 !bg-transparent">
            <Emoji32Regular />
          </Button>
        </div>
      )}</div>
      <Textarea
        placeholder="Add a comment"
        className="flex-1 border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm"
      />
      {!isComment && <><Button className="!p-0 !bg-transparent">
        <MdOutlineImage />
      </Button>
      <Button className="!p-0 !bg-transparent">
        <Emoji32Regular />
      </Button></>}
      {isComment && (
        <Button className="text-[#f4f4f4] text-light text-xs font-sans px-4 py-1.5 rounded-[6px] bg-[#430B68] hover:bg-[#430B68]">Post</Button>
      )}
    </div>
  );
};

export default FeedsComment;
