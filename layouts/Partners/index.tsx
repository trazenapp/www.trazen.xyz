import React from "react";
import Heading from "@/components/heading";
import PartnerSlider from "@/layouts/PartnerSlider";

const Partners = () => {
  return (
    <div className="w-11/12 relative p-10 overflow-hidden">
      <Heading className="text-center mb-14">Trusted By</Heading>
      <PartnerSlider />
      <div className="pointer-events-none absolute inset-0 z-[999]">
        <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-[#0B0B0B] to-transparent"></div>
        <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-t from-[#0B0B0B] to-transparent"></div>
      </div>
    </div>
  );
};

export default Partners;
