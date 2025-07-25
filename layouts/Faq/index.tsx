import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/badge";
import Heading from "@/components/heading";
import { Faqs } from "@/constants/faq";

const Faq = () => {
  return (
    <section id="faq" className="w-full mt-[120px] flex flex-col justify-center items-center relative overflow-hidden">
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
          className="w-full md:w-7/12 flex flex-col gap-y-8"
          collapsible
        >
          {Faqs.map((faq) => (
            <AccordionItem
              value={faq.id}
              key={faq.id}
              className="px-6 py-[18px] h-fit rounded-[12px] bg-[#161616] border-0"
            >
              <AccordionTrigger className="p-0 font-sans text-xl font-medium hover:cursor-pointer hover:no-underline">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[#A6A6A6] text-base font-normal mt-[22px]">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
