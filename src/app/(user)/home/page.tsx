"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import Feeds from "@/src/components/feeds";
import { chainOptions, nicheOptions } from "@/src/constants/options";
import FormRadio from "@/src/components/form/formRadio";
import { MdFilterList } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTop(currentY > 400);
      setScrollUp(currentY < lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <Tabs
        defaultValue="explore"
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row items-center gap-x-5 fixed top-[60px] lg:top-[83px] w-[95%] lg:w-[48.5%] bg-[#0B0B0B] z-10 h-20">
          <TabsList className="bg-transparent border border-[#303030] py-1.5 px-2 md:px-[11px] md:py-[5px] h-fit flex-1 rounded-2xl w-full font-sans">
            <TabsTrigger
              value="my-space"
              className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68] cursor-pointer"
            >
              My Space
            </TabsTrigger>
            <TabsTrigger
              value="explore"
              className="text-[#9F9F9F] font-normal py-2 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-[#430B68] cursor-pointer"
            >
              Explore
            </TabsTrigger>
          </TabsList>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-fit text-2xl! px-5! py-4! bg-transparent border border-[#303030] rounded-2xl">
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
        <TabsContent className="relative w-full h-full" value="my-space">
          <div className="w-full h-full mt-[60px]">
            <Feeds isPrivate={true} />
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="explore">
          <div className="w-full h-full mt-[60px]">
            <Feeds isPrivate={false} />
          </div>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: scrollUp ? 0.5 : 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-[#1E1E1E] text-white shadow-lg border border-[#303030] backdrop-blur-md hover:opacity-100 transition"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
