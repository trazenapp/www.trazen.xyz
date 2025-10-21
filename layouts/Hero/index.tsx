"use client";
import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/layouts/Navbar";
import MobileNav from "@/layouts/MobileNav";
import imgLeft from "@/public/header-bg.png";
import imgRight from "@/public/header-bg-2.png";
import bgDashboard from "@/public/hero-Dashboard.png";
import LightRays from "@/components/lightRays";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!scrollRef.current) return;
    gsap.from(scrollRef.current, {
      y: 150,
      ease: "power2.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 80%",
        end: "top 8%",
        toggleActions: "restart none none none",
        scrub: true,
      },
    });
  }, [scrollRef]);

  return (
    <header className="relative w-full flex flex-col justify-center items-center overflow-hidden md:py-16 py-6">
      <div className="absolute top-0 w-[100%] h-[100%] -z-10 overflow-hidden ">
        <LightRays
          raysOrigin="top-center"
          raysColor="#9707da"
          raysSpeed={1.7}
          lightSpread={1.6}
          rayLength={1.5}
          followMouse={true}
          fadeDistance={1.8}
          mouseInfluence={0.2}
          noiseAmount={0.3}
          distortion={0.001}
          className="custom-rays"
        />
      </div>
      <Navbar />
      <MobileNav />
      <Image
        src={imgLeft}
        alt="Header background image"
        className="max-lg:hidden absolute top-1/2 -translate-1/2 md:left-[11%] lg:left-[10%] left-[3%] lg:w-[20%] md:w-[22%] w-[27%] "
      />
      <Image
        src={imgRight}
        alt="Header background image"
        className="max-lg:hidden absolute top-1/2 -translate-1/2 lg:-right-[9.5%] md:-right-[10.5%] -right-[21.6%] lg:w-[19%] md:w-[21%] w-[24%]"
      />
      <div className="lg:mt-[118px] mt-[70px] flex flex-col items-center text-center relative z-10">
        <h1 className="text-[38px] sm:text-[40px] md:text-[45px] text-center lg:text-[50px] xl:text-6xl font-clash-display font-semibold w-10/12 md:w-[79%] lg:w-8/12 mb-6">
          Stay Ahead in Web3 Easily. Without all the hassle
        </h1>
        <p className="lg:text-[16px] xl:text-lg font-sans font-normal lg:w-[45%] md:w-[45%] w-[75%] mb-8">
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
              <Link
                href="https://trazen-1.gitbook.io/trazen/"
                className="font-sans text-base font-medium text-white text-center"
              >
                Whitepaper
              </Link>
            </div>
          </Button>
        </div>
      </div>

      <div className="w-10/12  xl:w-[76%] relative z-10" ref={scrollRef}>
        <Image src={bgDashboard} alt="Header background image" className="" />
      </div>
    </header>
  );
};

export default Hero;
