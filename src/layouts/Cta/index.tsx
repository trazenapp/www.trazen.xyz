"use client";

import React from "react";
import Image from "next/image";
import Card from "@/src/components/card";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import img from "@/public/trazen-inverse.svg";
import SpotlightCard from "@/src/components/SpotlightCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Cta = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    gsap.from(scrollRef.current, {
      opacity: 0.3,
      y: 100,
      duration: 1.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top+=80%",
        end: "top 20%",
        toggleActions: "restart none none pause",
        scrub: true,
      },
    });
  }, [scrollRef]);

  return (
    <section className="w-11/12 md:w-10/12 mt-[120px]" ref={scrollRef}>
      <SpotlightCard className="custom-spotlight-card bg-[#161616] rounded-4xl border-[#434343] card z-500">
        <Card className="flex px-4 md:px-[60px]! md:py-[76px]! bg-transparent border-0 shadow-none p-0">
          <div className={`w-full lg:w-7/12 flex flex-col gap-y-6`}>
            <h4 className="font-sans font-semibold text-[32px] md:text-4xl">
              Stay Ahead of the Curve in Web3
            </h4>
            <p className="font-sans text-sm font-normal">
              Don’t just catch up, stay ahead. Get personalized updates,
              real-time project drops, and meaningful community insights
              delivered straight to your feed
            </p>
            <Link href="/sign-up" className="flex">
              <Button className="relative p-px rounded-full bg-linear-to-br from-[#C83BE5] to-[#2C05334D] hover:from-[#9218E1] hover:to-[#BF66FA] transition w-full lg:w-fit">
                <div className="bg-[#161616] rounded-full px-6 py-4 text-white flex items-center justify-center gap-x-3.5 w-full">
                  Get Started <ArrowRight />
                </div>
              </Button>
            </Link>
          </div>
          <Image
            src={img}
            alt="svg logo"
            className="lg:flex hidden absolute top-7/12 -translate-y-1/2 -right-20 z-700000"
          />
        </Card>
      </SpotlightCard>
    </section>
  );
};

export default Cta;
