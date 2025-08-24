import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Feeds from "@/components/feeds";
import { MdFilterList } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <Tabs
        defaultValue="personal-feed"
        className="w-full flex flex-col items-center"
      >
        <div className="w-full flex flex-row gap-x-5">
          <TabsList className="bg-transparent border border-[#303030] py-1.5 px-2 md:p-[11px] h-fit flex-1 rounded-2xl w-full mb-8 md:mb-8 font-sans">
            <TabsTrigger value="personal-feed" className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68]">Personal Feed</TabsTrigger>
            <TabsTrigger value="general-feed" className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68]">General Feed</TabsTrigger>
          </TabsList>
          <Button className="h-fit !text-2xl !p-5 bg-transparent border border-[#303030]">
            <MdFilterList />
          </Button>
        </div>
        <TabsContent className="relative w-full h-full" value="personal-feed">
          <div className="w-full h-full"><Feeds /></div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="general-feed">
          <Feeds />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
