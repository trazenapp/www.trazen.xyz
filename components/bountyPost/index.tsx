"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type BountyPostProps = {
  bountyTitle: string;
  setBountyTitle: (value: string) => void;
  bountyDuration: string;
  setBountyDuration: (value: string) => void;
  bountyReward: string;
  setBountyReward: (value: string) => void;
  bountyLink: string;
  setBountyLink: (value: string) => void;
};

function BountyPost({
  bountyTitle,
  setBountyTitle,
  bountyDuration,
  setBountyDuration,
  bountyReward,
  setBountyReward,
  bountyLink,
  setBountyLink,
}: BountyPostProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="bounty-title"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty title
        </Label>
        <Input
          id="bounty-title"
          name="name"
          value={bountyTitle}
          onChange={(e) => setBountyTitle(e.target.value)}
          placeholder="Example: Street art challenge"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="duration"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Duration
        </Label>
        <Input
          id="duration"
          name="name"
          value={bountyDuration}
          onChange={(e) => setBountyDuration(e.target.value)}
          placeholder="Enter duration"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="reward"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Reward
        </Label>
        <Input
          id="reward"
          name="name"
          value={bountyReward}
          onChange={(e) => setBountyReward(e.target.value)}
          placeholder="Example: $350"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="bounty-link"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Bounty link
        </Label>
        <Input
          id="bounty-link"
          name="name"
          value={bountyLink}
          onChange={(e) => setBountyLink(e.target.value)}
          placeholder="Enter external job link"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>
    </div>
  );
}

export default BountyPost;
