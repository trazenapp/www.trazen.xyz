import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GigsCard from "@/components/hiringCard";
import BountyCard from "@/components/bountyCard";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import Hiring from "@/components/hiring";

const Gigs = () => {
  return (
    <div>
      <Tabs defaultValue="hiring" className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row gap-x-5">
          <TabsList className="bg-transparent border-b border-b-[#303030] px-11 md:px-[55px] lg:px-[110px] py-0 h-fit flex-1 rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
            <TabsTrigger
              value="hiring"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              Hiring
            </TabsTrigger>
            <TabsTrigger
              value="bounties"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              Bounties
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="relative w-full h-full" value="hiring">
          <Hiring />
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="bounties">
          <div className="flex gap-x-2.5 items-center mb-4">
            <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
              <FiSearch color="#9F9F9F" className="text-xl" />
              <Input
                type="text"
                placeholder="Search bounty title or keyword"
                className="font-sans border-0 focus-visible:ring-0 p-0"
              />
            </div>
          </div>
          <BountyCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gigs;
