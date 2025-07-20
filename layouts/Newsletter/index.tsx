import Badge from "@/components/badge";
import Heading from "@/components/heading";
import React from "react";
import Image from "next/image";
import img from "@/public/trazen-inverse.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-11/12 md:w-10/12 mt-[120px] flex flex-col justify-center items-center relative">
      <div className="border border-[#434343] md:!py-[66px] p-3.5 w-full md:w-9/12 rounded-4xl backdrop-blur bg-[#161616]/50 flex flex-col justify-center items-center relative z-10">
        <div className="w-full lg:w-10/12 flex flex-col gap-y-6 mb-10">
          <Badge>Our newsletter</Badge>
          <Heading
            className="text-center"
            subText="Receive emails by subscribing to our weekly newsletter. Get the new and the buzz before anyone else."
          >
            Get the buzz delivered to you
          </Heading>
          <div className="flex justify-center items-center py-2 px-2 md:px-2.5 border border-[#D9D9D9] rounded-full w-full">
            <input className="flex-1 px-2.5 md:px-[22px] font-sans text-base font-normal text-white focus:border-0 focus:outline-0 placeholder:text-white" placeholder="Enter your email address" />
              <Button
            className="flex gap-x-1 md:gap-x-2.5 rounded-full bg-gradient-to-b from-[#BF66FA] to-[#9218E1] border border-[#D9D9D9] !py-4 !px-2 md:w-[160px] text-xs md:text-base"
          >
            Subscribe
            <ArrowRight className="hidden md:flex" />
          </Button>
          </div>
        </div>
      </div>
      <Image
        src={img}
        alt="svg logo"
        className="lg:flex hidden absolute top-11/12 -translate-y-1/2 -left-[25%]"
      />
    </section>
  );
};

export default Newsletter;
