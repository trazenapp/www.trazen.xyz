"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function BountyPost() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="bounty-title"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty title
        </Label>
        <Input
          id="bounty-title"
          name="name"
          placeholder="Example: Street art challenge"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="duration"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max "
        >
          Duration
        </Label>
        <Input
          id="duration"
          name="name"
          placeholder="Enter duration"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="reward"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max"
        >
          Reward
        </Label>
        <Input
          id="reward"
          name="name"
          placeholder="Example: $350"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="bounty-link"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty link
        </Label>
        <Input
          id="bounty-link"
          name="name"
          placeholder="Enter external job link"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>
    </div>
  );
}

export default BountyPost;
