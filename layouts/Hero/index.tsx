"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/layouts/Navbar";
import MobileNav from "@/layouts/MobileNav";
import imgLeft from "@/public/header-bg.png";
import imgRight from "@/public/header-bg-2.png";
import bgDashboard from "@/public/hero-Dashboard.png";

const Hero = () => {
  const router = useRouter();
  return (
    <header className="relative w-full flex flex-col justify-center items-center overflow-hidden md:py-16 py-6">
      <Navbar />
      <MobileNav />
      <Image
        src={imgLeft}
        alt="Header background image"
        className="absolute top-1/2 -translate-1/2 lg:left-[7%] md:left-[4%] left-[3%] w-[18%]"
      />
      <Image
        src={imgRight}
        alt="Header background image"
        className="absolute top-1/2 -translate-1/2 lg:-right-[12%] md:-right-[12%] -right-[16%] w-[18%]"
      />
      <div className="mt-[118px] flex flex-col items-center text-center relative z-10">
        <h1 className="text-[48px] md:text-[54px] lg:text-6xl font-clash-display font-semibold w-10/12 md:w-[79%] lg:w-8/12 mb-6">
          Stay Ahead in Web3 Easily. Without all the hassle
        </h1>
        <p className="text-lg font-sans font-normal lg:w-[43%] md:w-[40%] w-[75%] mb-8">
          Your personalized Web3 feed with curated updates, real conversations,
          and real projects in one dynamic hub.
        </p>
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6 items-center ">
          <Button
            onClick={() => router.push("/sign-up")}
            className="rounded-full bg-gradient-to-b from-[#BF66FA] to-[#9218E1] border border-[#D9D9D9]"
          >
            Get started
          </Button>
          <Button className="relative p-[1px] rounded-full bg-gradient-to-b from-[#BF66FA] to-[#9218E1] hover:from-[#9218E1] hover:to-[#BF66FA] transition">
            <div className="bg-[#0b0b0b] rounded-full px-6 py-4 text-white">
              Whitepaper
            </div>
          </Button>
        </div>
      </div>
      <div className="w-10/12 md:w-9/12 relative z-10">
        <Image src={bgDashboard} alt="Header background image" className="" />
      </div>
    </header>
  );
};

export default Hero;
