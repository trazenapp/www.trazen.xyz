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
import Card from "@/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdMoreHoriz } from "react-icons/md";
import AvatarProfile from "@/components/avatarProfile";
import { BsPatchCheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FeedsMedia from "@/components/feedsMedia";
import FeedsComment from "@/components/feedsComment";
import { media } from "@/constants/feedsMedia";
import {
  PiArrowFatUp,
  PiArrowFatDown,
  PiBookmarkSimpleBold,
} from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbShare3 } from "react-icons/tb";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";

const Home = () => {
  const router = useRouter();
  const handlePageClick = (slug: string) => {
    router.push(`/home/${slug}`);
  };
  return (
    <div className="">
      <Tabs
        defaultValue="personal-feed"
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
            <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-x-2.5 font-sans">
                  <Link href="/profile" className="flex items-start gap-x-2.5">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="flex gap-x-1 items-center">
                        <span className="font-medium text-sm md:text-base">
                          umf84596
                        </span>
                        {/* <BsPatchCheckFill size={12} color="#B348F9" /> */}
                      </p>
                      <p className="text-[#A6A6A6] text-xs font-light">
                        1h ago
                      </p>
                    </div>
                  </Link>
                  {/* <Button className="!py-1 !px-2.5 border !border-[#DDDDDD] !text-[#DDDDDD] rounded-full text-[10px]">
                    Follow
                  </Button> */}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="!w-fit !h-fit p-0">
                      <MdMoreHoriz size={36} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-[#272727] !min-w-0 !p-0 border-0 w-32"
                    align="end"
                  >
                    <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3">
                      {/* <Edit />  */}
                      Follow
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem className="text-[#ddd] font-sans font-normal text-xs !w-full flex items-center gap-x-2.5 py-2.5 px-3">
                      <Trash2 color="red" /> Delete
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p
                onClick={() => handlePageClick("test")}
                className="cursor-pointer text-[#F4F4F4F4] text-sm lg:text-base font-normal font-sans line-clamp-2"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <div className="overflow-hidden rounded-[12px] w-full">
                <FeedsMedia media={media} maxVisible={4} />
              </div>
              <div
                className="flex justify-between gap-x-2.5 overflow-x-scroll md:overflow-x-hidden"
                style={{ scrollbarWidth: "none" }}
              >
                <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
                  <PiArrowFatUp />
                  276
                </Button>
                <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
                  <PiArrowFatDown />
                  276
                </Button>
                <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
                  <IoChatbubbleOutline />
                  276
                </Button>
                <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
                  <TbShare3 />
                  276
                </Button>
                <Button className="!w-fit !h-fit !py-1.5 !px-6 rounded-full border border-[#303030] flex gap-x-2.5 font-sans font-medium text-sm">
                  <PiBookmarkSimpleBold />
                  276
                </Button>
              </div>
              <FeedsComment />
            </Card>
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="general-feed">
          <div className="w-full h-full mt-[60px]">
            <Feeds />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
