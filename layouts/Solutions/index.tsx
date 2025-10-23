"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users_solutions, project_pioneers } from "@/constants/solutions";
import Heading from "@/components/heading";
import Badge from "@/components/badge";
import Card from "@/components/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Solutions = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [tabValue, setTabValue] = useState<string>("users");

  useGSAP(() => {
    if (!scrollRef.current) return;

    gsap.from(".card-1", {
      x: -100,
      y: -40,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 95%",
        end: "top 20%",
        toggleActions: "restart pause resume none",
        scrub: true,
      },
    });

    gsap.from(".card-2", {
      x: 100,
      y: -40,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 98%",
        end: "top 20%",
        toggleActions: "restart pause resume none",
        scrub: true,
      },
    });

    gsap.from(".card-3", {
      x: -100,
      y: 40,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 40%",
        end: "bottom 60%",
        toggleActions: "restart pause resume none",
        scrub: true,
      },
    });

    gsap.from(".card-4", {
      x: 100,
      y: 40,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 40%",
        end: "bottom 60%",
        toggleActions: "restart pause resume none",
        scrub: true,
      },
    });
  }, [scrollRef]);

  return (
    <section className="w-11/12 md:w-10/12 mt-[120px] flex flex-col items-center justify-center relative">
      <div className="w-full md:w-8/12 flex flex-col gap-y-6 mb-[60px]">
        <Badge>Solutions</Badge>
        <Heading
          className="text-center"
          subText="Whether you're here to stay informed or to share what you're building, we’ve created an experience tailored to your needs"
        >
          The Web3 Feed That Works for{" "}
          <span className="bg-gradient-to-r italic from-[#9218E1] to-[#BF66FA] text-transparent bg-clip-text">
            Enthusiasts
          </span>
        </Heading>
      </div>
      <Tabs value={tabValue} className="w-full flex flex-col items-center">
        <TabsList className="bg-[#161616] py-1.5 px-2 md:p-[11px] h-fit flex rounded-full w-full md:w-8/12 mb-8 md:mb-12">
          <TabsTrigger
            className="data-[state=active]:bg-[#430B68] p-[5px] md:p-2.5 h-fit hover:cursor-pointer rounded-full text-[#F4F4F4F4] font-sans text-base md:text-xl"
            value="users"
            onClick={() => setTabValue("users")}
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#430B68] p-[5px] md:p-2.5 h-fit hover:cursor-pointer rounded-full text-[#F4F4F4F4] font-sans text-base md:text-xl"
            value="pioneers"
            onClick={() => setTabValue("pioneers")}
          >
            Project pioneers
          </TabsTrigger>
        </TabsList>
        <TabsContent className="relative" value="users" ref={scrollRef}>
          <div
            className={`w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-1/2 left-1/2 -translate-1/2`}
          ></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {users_solutions.map((item, index) => (
              <SpotlightCard
                className={`custom-spotlight-card card-${index + 1} bg-[#161616] rounded-4xl border-[#434343] ${tabValue === "users" ? "card z-500 overflow-hidden relative grid-card" : ""}`}
              >
                <Card
                  key={index}
                  className="p-4 md:!px-6 md:!py-6 flex flex-col gap-y-6 bg-transparent border-0"
                >
                  <div className="w-14 h-14 rounded-[10px] border border-[#434343] flex justify-center items-center font-sans text-white">
                    <Image src={item.image} alt={item.title} className="" />
                  </div>
                  <h6 className="text-xl font-semibold font-sans">
                    {item.title}
                  </h6>
                  <p className="text-base font-normal leading-7 font-sans">
                    {item.subtitle}
                  </p>
                </Card>
              </SpotlightCard>
            ))}
          </div>
        </TabsContent>
        <TabsContent className="relative" value="pioneers">
          <div
            className={`w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-1/2 left-1/2 -translate-1/2`}
          ></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {project_pioneers.map((item, index) => (
              <SpotlightCard
                className={`custom-spotlight-card bg-[#161616] rounded-4xl border-[#434343] ${tabValue === "pioneers" ? "card z-500 overflow-hidden relative grid-card" : ""}`}
              >
                <Card
                  key={index}
                  className="p-4 md:!px-6 md:!py-6 flex flex-col gap-y-6 bg-transparent border-0"
                >
                  <div className="w-14 h-14 rounded-[10px] border border-[#434343] flex justify-center items-center font-sans text-white">
                    <Image src={item.image} alt={item.title} className="" />
                  </div>
                  <h6 className="text-xl font-semibold font-sans">
                    {item.title}
                  </h6>
                  <p className="text-base font-normal leading-7 font-sans">
                    {item.subtitle}
                  </p>
                </Card>
              </SpotlightCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Solutions;
