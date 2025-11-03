"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import Badge from "@/src/components/badge";
import Heading from "@/src/components/heading";
import { Faqs } from "@/src/constants/faq";
import SpotlightCard from "@/src/components/SpotlightCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Faq = () => {
  const [openItem, setOpenItem] = useState<string | undefined>("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    const accordions = gsap.utils.toArray(scrollRef.current.children);
    accordions.forEach((accordion: any) => {
      gsap.from(accordion, {
        scale: 0.75,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: accordion,
          start: "top bottom",
          toggleActions: "restart none none none",
          scrub: true,
        },
      });
    });
  }, [scrollRef]);

  return (
    <section
      id="faq"
      className="w-full mt-[120px] flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div
        className={`md:w-[800px] md:h-[800px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-7/12 right-[75%] -translate-y-1/2 hidden md:flex`}
      ></div>
      <div
        className={`md:w-[800px] md:h-[800px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-[39%] left-[75%] -translate-y-1/2 hidden md:flex`}
      ></div>
      <div className="w-11/12 md:w-10/12 flex flex-col items-center justify-center mx-auto">
        <div className="w-full md:w-8/12 flex flex-col gap-y-6 mb-[60px]">
          <Badge>FAQ</Badge>
          <Heading className="text-center">Frequently Asked Questions</Heading>
        </div>
        <Accordion
          type="single"
          className="w-full lg:w-7/12 md:w-10/12 flex flex-col gap-y-8"
          value={openItem}
          onValueChange={(value) => setOpenItem(value)}
          collapsible
          ref={scrollRef}
        >
          {Faqs.map((faq) =>
            openItem === faq.id ? (
              <SpotlightCard className="custom-spotlight-card accordion-card overflow-hidden relative z-500 rounded-[12px] bg-[#161616] border-0">
                <AccordionItem
                  value={faq.id}
                  key={faq.id}
                  className={`px-6 py-[18px] h-fit `}
                >
                  <AccordionTrigger className="p-0 font-sans text-base font-medium hover:cursor-pointer hover:no-underline">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[#A6A6A6] text-sm font-normal mt-[22px]">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              </SpotlightCard>
            ) : (
              <AccordionItem
                value={faq.id}
                key={faq.id}
                className={`px-6 py-[18px] h-fit rounded-[12px] bg-[#161616] border-0`}
              >
                <AccordionTrigger className="p-0 font-sans text-base font-medium hover:cursor-pointer hover:no-underline">
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-[#A6A6A6] text-sm font-normal mt-[22px]">
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
