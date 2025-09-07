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
import RichTextEditor from "../richTextEditor";

function HiringPost() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-title"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job title
        </Label>
        <Input
          id="job-title"
          name="name"
          placeholder="Example: Backend developer"
          className="border-[#434343] text-[16px] text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-description"
          className="text-[#f4f4f4f2] font-normal text-[16px] w-max"
        >
          Job description
        </Label>
        <RichTextEditor />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="job-type"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max"
        >
          Job type
        </Label>
        <Select defaultValue="">
          <SelectTrigger className="group font-sans w-full py-5 px-4  border-[#434343] text-[#f4f4f4]">
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
                className="text-[#bcbcbc] text-[14px] focus:bg-[#303030] focus:text-[#fff]"
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
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max"
        >
          Experience level
        </Label>
        <Select defaultValue="">
          <SelectTrigger className="font-sans w-full py-5 px-4  border-[#434343] text-[#f4f4f4] ">
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
                className="text-[#bcbcbc] text-[14px] focus:bg-[#303030] focus:text-[#fff]"
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
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max "
        >
          Job location
        </Label>
        <Input
          id="job-location"
          name="name"
          placeholder="Example: New York, USA"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />

        <div className=" flex gap-18">
          <div className="flex gap-3 items-center">
            <Label htmlFor="on-site" className="cursor-pointer">
              <Input
                id="on-site"
                type="radio"
                name="event-type"
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68]"
              ></span>
              <p className="text-[#f4f4f4] text-sm ">On Site</p>
            </Label>
          </div>

          <div className="flex gap-3 items-center">
            <Label htmlFor="remote" className="cursor-pointer">
              <Input
                id="remote"
                type="radio"
                name="event-type"
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68]"
              ></span>
              <p className="text-[#f4f4f4] text-sm">Remote</p>
            </Label>
          </div>

          <div className="flex gap-3 items-center">
            <Label htmlFor="hybrid" className="cursor-pointer">
              <Input
                id="hybrid"
                type="radio"
                name="event-type"
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68]"
              ></span>
              <p className="text-[#f4f4f4] text-sm">Hybrid</p>
            </Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="payment"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max"
        >
          Payment
        </Label>
        <Input
          id="payment"
          name="name"
          placeholder="Example: $150k/year or $35/hr"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Label
          htmlFor="application-link"
          className="text-[16px] text-[#f4f4f4f2] font-normal w-max "
        >
          Application link
        </Label>
        <Input
          id="application-link"
          name="name"
          placeholder="Enter external job link"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
        />
      </div>
    </div>
  );
}

export default HiringPost;
