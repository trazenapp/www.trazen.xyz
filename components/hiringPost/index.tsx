"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Descendant } from "slate";
import RichTextEditor from "../richTextEditor";

type HiringPostProps = {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobType: string;
  setJobType: (value: string) => void;
  jobExperienceLevel: string;
  setJobExperienceLevel: (value: string) => void;
  jobLocation: string;
  setJobLocation: (value: string) => void;
  jobConvenience: string;
  setJobConvenience: (value: string) => void;
  jobPayment: string;
  setJobPayment: (value: string) => void;
  jobApplicationLink: string;
  setJobApplicationLink: (value: string) => void;
  description: Descendant[];
  setDescription: (value: Descendant[]) => void;
  editor: any;
};

function HiringPost({
  jobTitle,
  setJobTitle,
  jobType,
  setJobType,
  jobExperienceLevel,
  setJobExperienceLevel,
  jobLocation,
  setJobLocation,
  jobConvenience,
  setJobConvenience,
  jobPayment,
  setJobPayment,
  jobApplicationLink,
  setJobApplicationLink,
  description,
  setDescription,
  editor,
}: HiringPostProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-title"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job title
        </Label>
        <Input
          id="job-title"
          name="name"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Example: Backend developer"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-description"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Job description
        </Label>
        <RichTextEditor
          description={description}
          setDescription={setDescription}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-type"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job type
        </Label>
        <Select value={jobType} onValueChange={(val) => setJobType(val)}>
          <SelectTrigger className="group font-sans w-full py-5 px-4  border-[#434343] text-[#f4f4f4] text-sm">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent className="font-sans bg-[#161616] border-[#303030] ">
            <SelectGroup className="w-full">
              <SelectLabel className="text-[#f4f4f4] text-[16px] "></SelectLabel>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                value="contract"
              >
                Contract
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="full-time"
              >
                Full-time
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="internship"
              >
                Internship
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="volunteer"
              >
                Volunteer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="experience-level"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Experience level
        </Label>
        <Select
          value={jobExperienceLevel}
          onValueChange={(val) => setJobExperienceLevel(val)}
        >
          <SelectTrigger className="font-sans w-full py-5 px-4  border-[#434343] text-[#f4f4f4] text-sm ">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent className="font-sans bg-[#161616] border-[#303030] ">
            <SelectGroup className="w-full">
              <SelectLabel className="text-[#f4f4f4] text-[16px] "></SelectLabel>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                value="entry"
              >
                Entry
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="intermediate"
              >
                Intermediate
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="expert"
              >
                Expert
              </SelectItem>
              <SelectItem
                className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                value="none"
              >
                None
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label
          htmlFor="job-location"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Job location
        </Label>
        <Input
          id="job-location"
          name="name"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          placeholder="Example: New York, USA"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />

        <div className=" flex gap-18 max-[550px]:gap-0 max-[550px]:justify-between">
          <div className="flex gap-3 items-center">
            <Label htmlFor="on-site" className="cursor-pointer">
              <Input
                id="on-site"
                type="radio"
                name="job-convenience"
                value="on-site"
                checked={jobConvenience === "on-site"}
                onChange={(e) => setJobConvenience(e.target.value)}
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
              ></span>
              <p className="text-[#f4f4f4] sm:text-sm text-[12px] ">On Site</p>
            </Label>
          </div>

          <div className="flex gap-3 items-center">
            <Label htmlFor="remote" className="cursor-pointer">
              <Input
                id="remote"
                type="radio"
                name="job-convenience"
                value="remote"
                checked={jobConvenience === "remote"}
                onChange={(e) => setJobConvenience(e.target.value)}
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
              ></span>
              <p className="text-[#f4f4f4] sm:text-sm text-[12px]">Remote</p>
            </Label>
          </div>

          <div className="flex gap-3 items-center">
            <Label htmlFor="hybrid" className="cursor-pointer">
              <Input
                id="hybrid"
                type="radio"
                name="job-convenience"
                value="hybrid"
                checked={jobConvenience === "hybrid"}
                onChange={(e) => setJobConvenience(e.target.value)}
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
              ></span>
              <p className="text-[#f4f4f4] sm:text-sm text-[12px]">Hybrid</p>
            </Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="payment"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max"
        >
          Payment
        </Label>
        <Input
          id="payment"
          name="name"
          value={jobPayment}
          onChange={(e) => setJobPayment(e.target.value)}
          placeholder="Example: $150k/year or $35/hr"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="application-link"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Application link
        </Label>
        <Input
          id="application-link"
          name="name"
          value={jobApplicationLink}
          onChange={(e) => setJobApplicationLink(e.target.value)}
          placeholder="Enter external job link"
          className="border-[#434343] !text-sm text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>
    </div>
  );
}

export default HiringPost;
