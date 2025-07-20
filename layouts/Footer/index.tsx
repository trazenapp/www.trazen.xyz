import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerMenu } from "@/constants/nav-menu";
import X from "@/public/x.svg"

const Footer = () => {
  return (
      <footer className="w-full px-5 md:px-[102px] py-10 md:py-[68px] flex flex-col justify-center items-center relative rounded-t-[24px] md:rounded-t-[32px] bg-[#161616] mt-[120px]">
      <div className="flex flex-col justify-center items-center w-full">
        <ul className="flex flex-col md:flex-row gap-y-6 md:gap-x-12 mb-12">
          {
            footerMenu.map(item => (
              <Link href={item.href} className="font-sans text-base font-medium text-white text-center">{ item.label }</Link>
            ))
          }
        </ul>
        <div className="border-[0.5px] border-white w-full" />
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0 items-center md:justify-between mt-10 w-full">
          <Link href="#" className="h-[42px] w-[42px] rounded-full border flex justify-center items-center">
            <Image src={X} alt="x icon" />
          </Link>
          <p>©Trazen 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
