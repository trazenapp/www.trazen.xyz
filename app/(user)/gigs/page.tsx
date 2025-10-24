import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hiring from "@/components/hiring";
import Bounty from "@/components/bounty";

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
          <Bounty />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gigs;
