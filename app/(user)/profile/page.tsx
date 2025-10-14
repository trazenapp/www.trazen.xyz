"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feedscard from "@/components/feedsCard";
import { FaArrowLeft, FaSquareXTwitter } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCube } from "react-icons/hi";

const Profile = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex items-center gap-x-6 font-sans mb-4">
        <Button onClick={router.back} className="border-0 bg-transparent">
          <FaArrowLeft />
        </Button>
        <div className="flex gap-x-2.5">
          <p className="text-[#f4f4f4] text-xl font-medium flex items-center gap-x-2">
            CryptoMachine <BsPatchCheckFill size={12} color="#B348F9" />
          </p>
          <p className="text-[#7F7F7F] text-xl font-light">200 posts</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-x-5">
          <Avatar className="w-[120px] h-[120px]">
            <AvatarImage src="https://github.com/shadcn.png" className="" />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 font-sans">
            <p className="text-[#f4f4f4] text-[28px] font-medium flex items-center gap-x-2 mb-4">
              CryptoMachine <BsPatchCheckFill size={24} color="#B348F9" />
            </p>
            <p className="text-base font-normal text-[#BCBCBC]">
              CryptoMachine is a high-speed DeFi and NFT platform built on Solana, designed to power automated trading tools, digital collectibles, and on-chain utilities—fast, low-cost.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-y-4 items-center gap-x-5 font-sans">
          <div className="flex flex-row items-center gap-x-2">
            <IoPeopleOutline color="#7f7f7f" className="text-xl" />
            <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
              <span>19.3K</span>
              <span className="text-[#7f7f7f] font-normal">Followers</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <FaSquareXTwitter color="#7f7f7f" className="text-xl" />
            <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
              <Link href="mailto:https://x.com/CyptoMachine" className="text-[#1768FF] font-normal">https://x.com/CyptoMachine</Link>
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <HiOutlineCube color="#7f7f7f" className="text-xl" />
            <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
              <span className="text-[#BCBCBC] font-normal">Solana . Ethereum</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <RxDashboard color="#7f7f7f" className="text-xl" />
            <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
              <span className="text-[#BCBCBC] font-normal">NFTs</span>
            </p>
          </div>
        </div>
        <Button className="font-sans bg-white hover:bg-white text-black rounded-full py-3 mb-4">Follow</Button>
      </div>
      <Tabs
        defaultValue="announcements"
        className="w-full flex flex-col items-center"
      >
        <div className="w-full flex flex-row gap-x-5">
          <TabsList className="bg-transparent border-b border-b-[#303030] px-11 md:px-[55px] lg:px-[110px] py-0 h-fit flex-1 rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
            <TabsTrigger
              value="announcements"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="all-posts"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              All Posts
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="relative w-full h-full" value="announcements">
          <div className="w-full h-full">
            {/* <Feedscard /> */}
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="all-posts">
          {/* <Feedscard /> */}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Profile;
