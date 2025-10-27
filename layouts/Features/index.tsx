"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/heading";
import Badge from "@/components/badge";
import Card from "@/components/card";
import { featureContent } from "@/constants/features";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Features = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    const cards = gsap.utils.toArray(scrollRef.current.children);
    cards.forEach((card: any) => {
      gsap.from(card, {
        opacity: 0.3,
        y: 80,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top top+=70%",
          end: "top 10%",
          toggleActions: "restart none none none",
          scrub: true,
        },
      });
    });
  }, [scrollRef]);

  return (
    <section
      id="features"
      className="w-11/12 md:w-10/12 relative overflow-hidden lg:mt-[120px] mt-[65px] flex flex-col justify-center items-center"
    >
      <div className="w-full md:w-6/12 flex flex-col gap-y-6 mb-[60px]">
        <Badge>Core features</Badge>
        <Heading
          className="text-center"
          subText="Everything you need to stay informed and connected in the fast-moving world of Web3"
        >
          Your Web3 Hub, Reimagined
        </Heading>
      </div>
      <div className="flex flex-col gap-y-12 md:gap-y-[60px]" ref={scrollRef}>
        {featureContent.map((item, index) => (
          <SpotlightCard
            className="custom-spotlight-card bg-[#161616] rounded-4xl border-[#434343] card z-500"
            key={item.title}
          >
            <Card className=" flex flex-col lg:flex-row gap-y-20 lg:gap-y-0 lg:gap-x-10 font-sans bg-transparent border-0 shadow-none">
              <div
                className={`w-full lg:w-1/2 flex flex-col gap-y-6 md:gap-y-8 ${index === 1 && "order-1 lg:order-2"}`}
              >
                <h4 className="font-semibold text-[28px] md:text-[36px]">
                  {item.title}
                </h4>
                <p className="text-sm font-normal">{item.subtitle}</p>
                <Link href={item.href} className="flex z-1000">
                  <Button className="relative p-[1px]  backdrop-blur-3xl rounded-full bg-gradient-to-br from-[#c83be5] to-[#2C05334D] hover:from-[#9218e1] hover:to-[#BF66FA] transition w-full lg:w-fit">
                    <div className="bg-[#161616] rounded-full px-6 py-4 text-white flex items-center justify-center gap-x-3.5 w-full ">
                      Learn more <ArrowRight />
                    </div>
                  </Button>
                </Link>
              </div>
              <div
                className={`w-full lg:w-1/2 flex flex-col gap-y-6 md:gap-y-8 relative ${
                  index === 1 ? "order-2 lg:order-1 lg:pr-10" : "lg:pl-10"
                }`}
              >
                <div
                  className={`w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-radial/decreasing from-[#7212AF] from-15% to-transparent to-68% absolute bottom-[40%] md:-bottom-[1%] ${index === 1 ? "lg:-right-6 right-1/2 translate-x-1/2 lg:translate-x-0" : "lg:-left-6 left-1/2 -translate-x-1/2 lg:-translate-x-0"}`}
                ></div>

                <SpotlightCard className="custom-spotlight-card w-full h-full bg-[#1B1B1B] rounded-3xl flex flex-col justify-end items-center relative z-10 px-3 pt-10 md:p-0">
                  <Image
                    className={`${index === 0 && "w-[90%] h-[80%]"} ${index === 2 && "w-[90%] h-[90%] "}`}
                    src={item.image}
                    alt={item.title}
                  />
                </SpotlightCard>
              </div>
            </Card>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default Features;
