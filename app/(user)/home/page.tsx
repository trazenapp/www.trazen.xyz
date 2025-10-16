"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Feeds from "@/components/feeds";
import { chainOptions, nicheOptions } from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import { MdFilterList } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const Home = () => {
  const router = useRouter();
  return (
    <div className="">
      <Tabs
        defaultValue="general-feed"
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row items-center gap-x-5 fixed top-[83px] w-11/12 lg:w-[48.5%] bg-[#0B0B0B]/[50%] backdrop-blur-md z-10 h-20">
          <TabsList className="bg-transparent border border-[#303030] py-1.5 px-2 md:px-[11px] md:py-[5px] h-fit flex-1 rounded-2xl w-full font-sans">
            <TabsTrigger
              value="personal-feed"
              className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68]"
            >
              Personal Feed
            </TabsTrigger>
            <TabsTrigger
              value="general-feed"
              className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68]"
            >
              General Feed
            </TabsTrigger>
          </TabsList>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-fit !text-2xl !px-5 !py-4 bg-transparent border border-[#303030] rounded-2xl">
                <MdFilterList />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-[#161616] border-0 rounded-[10px] font-sans h-[80vh] md:h-auto overflow-y-scroll md:overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <DialogHeader className="flex flex-col gap-y-3.5">
                <DialogTitle className="border-b border-b-[#303030] font-medium text-left text-xs md:text-base py-3.5">
                  Filters
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-y-4">
                  <p className="text-[#F4F4F4F4] text-sm font-normal text-left">
                    Chains
                  </p>
                  <div>
                    <FormRadio
                      options={chainOptions}
                      value=""
                      onChange={() => {}}
                      selectedIcon={<FaCheck />}
                    />
                  </div>
                  <p className="text-[#F4F4F4F4] text-sm font-normal text-left mt-5">
                    Niche
                  </p>
                  <div>
                    <FormRadio
                      options={nicheOptions}
                      value=""
                      onChange={() => {}}
                      selectedIcon={<FaCheck />}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <TabsContent className="relative w-full h-full" value="personal-feed">
          <div className="w-full h-full mt-[60px]">
            <Feeds isPrivate={true} />
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="general-feed">
          <div className="w-full h-full mt-[60px]">
            <Feeds isPrivate={false} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
