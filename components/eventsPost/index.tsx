"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RichTextEditor from "../richTextEditor";
import { Descendant } from "slate";

type EventPostProps = {
  description: Descendant[];
  setDescription: (value: Descendant[]) => void;
  date: string;
  setDate: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  editor: any;
};

function EventsPost({
  description,
  setDescription,
  date,
  setDate,
  time,
  setTime,
  location,
  setLocation,
  eventType,
  setEventType,
  editor,
}: EventPostProps) {
  return (
    <div className="">
      <div className="flex flex-col gap-2 mt-4 max-w-full">
        <Label
          htmlFor="description"
          className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
        >
          Description
        </Label>
        <RichTextEditor
          description={description}
          setDescription={setDescription}
          // editor={editor}
        />
      </div>

      <div className="flex gap-5 max-w-full h-max mt-4">
        <div className="w-1/2 flex flex-col gap-2">
          <Label
            htmlFor="date"
            className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
          >
            Date
          </Label>

          <Input
            id="date"
            type="date"
            value={date}
            className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
            placeholder="Select date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <Label
            htmlFor="time"
            className="text-[#f4f4f4f2] font-normal sm:text-[16px] text-[14px] w-max"
          >
            Time
          </Label>

          <Input
            id="time"
            type="time"
            value={time}
            className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
            placeholder="Select time"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 max-w-full">
        <Label
          htmlFor="location"
          className="sm:text-[16px] text-[14px] text-[#f4f4f4f2] font-normal w-max "
        >
          Location
        </Label>
        <Input
          id="location"
          name="name"
          value={location}
          placeholder="Example: New York, USA"
          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#434343] focus-visible:!ring-[0]"
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className=" flex gap-18 max-[550px]:gap-0 max-[550px]:justify-between ">
          <div className="flex gap-3 items-center">
            <Label htmlFor="on-site" className="cursor-pointer">
              <Input
                id="on-site"
                type="radio"
                name="event-type"
                value="on-site"
                checked={eventType === "on-site"}
                onChange={(e) => setEventType(e.target.value)}
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
            <Label htmlFor="virtual" className="cursor-pointer">
              <Input
                id="virtual"
                type="radio"
                name="event-type"
                value="virtual"
                checked={eventType === "virtual"}
                onChange={(e) => setEventType(e.target.value)}
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-1 border-[#434343] flex items-center justify-center
           before:content-[''] before:w-2 before:h-2 before:rounded-full 
           before:bg-transparent peer-checked:before:bg-[#430b68] peer-checked:border-2"
              ></span>
              <p className="text-[#f4f4f4] sm:text-sm text-[12px]">Virtual</p>
            </Label>
          </div>

          <div className="flex gap-3 items-center">
            <Label htmlFor="hybrid" className="cursor-pointer">
              <Input
                id="hybrid"
                type="radio"
                name="event-type"
                value="hybrid"
                checked={eventType === "hybrid"}
                onChange={(e) => setEventType(e.target.value)}
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
    </div>
  );
}

export default EventsPost;
