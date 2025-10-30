import React from "react";
import Heading from "@/components/heading";
import PartnerSlider from "@/layouts/PartnerSlider";
import LogoLoop from "@/components/LogoLoop";
import { partnerSliderData } from "@/constants/partner-slider";

const Partners = () => {
  return (
    <section className="w-11/12 relative p-10 overflow-hidden">
      <Heading className="text-center mb-14">Trusted By</Heading>
      <div className="relative overflow-hidden">
        <LogoLoop
          logos={partnerSliderData}
          speed={120}
          direction="left"
          logoHeight={2.3}
          gap={50}
          pauseOnHover={false}
          fadeOut
          fadeOutColor="#0b0b0b"
          ariaLabel="Partners"
        />
      </div>
    </section>
  );
};

export default Partners;
