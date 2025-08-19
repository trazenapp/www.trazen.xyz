"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  return (
    <div>
      <Tabs
        defaultValue="personal-feed"
        className="w-full flex flex-col items-center"
      >
        <div className="w-full flex flex-row gap-x-5">
          <TabsList className="bg-transparent border border-[#303030] py-1.5 px-2 md:p-[11px] h-fit flex-1 rounded-2xl w-full mb-8 md:mb-8 font-sans">
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
              <Button className="h-fit !text-2xl !p-5 bg-transparent border border-[#303030]">
                <MdFilterList />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#161616] border-0 rounded-[10px] font-sans">
              <DialogHeader className="flex flex-col gap-y-3.5">
                <DialogTitle className="border-b border-b-[#303030] font-medium text-xs md:text-base py-3.5">
                  Filters
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-y-3.5">
                  <p className="text-[#F4F4F4F4] text-sm font-normal">
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
                  <p className="text-[#F4F4F4F4] text-sm font-normal">
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
          <div className="w-full h-full">
            <Feeds />
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="general-feed">
          <Feeds />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
