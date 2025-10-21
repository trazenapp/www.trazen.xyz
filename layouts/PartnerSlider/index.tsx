"use client";
import React from "react";
import Image from "next/image";
import { partnerSliderData } from "@/constants/partner-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/autoplay";
import { Virtual, Autoplay } from "swiper/modules";

const PartnerSlider = () => {
  return (
    <Swiper
      className="justify-between max-md:w-170"
      modules={[Virtual, Autoplay]}
      spaceBetween={60}
      slidesPerView={4}
      virtual
      autoplay
    >
      {partnerSliderData.map((item) => (
        <SwiperSlide key={item.alt}>
          <Image src={item.src} alt={item.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PartnerSlider;
