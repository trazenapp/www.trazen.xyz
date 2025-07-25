"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { navMenu } from "@/constants/nav-menu";
import logo from "@/public/trazen-logo.svg";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="w-10/12 border border-[#5E5E5E] py-3 px-4 rounded-full bg-linear-to-b from-[#A8A8A826] to-[#7A7A7A00] hidden lg:flex justify-between items-center">
      <Link href="/">
        <Image src={logo} alt="Trazen Logo" />
      </Link>
      <div className="flex lg:gap-x-[60px] md:gap-x-7 items-center">
        {navMenu.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="font-sans font-semibold text-base hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#9218E1] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex lg:gap-x-[60px] md:gap-x-7 items-center">
        <Link
          href="/sign-in"
          className="font-sans font-semibold text-base hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#9218E1] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Button onClick={() => router.push('/sign-up')} className="rounded-full bg-gradient-to-b from-[#BF66FA] to-[#9218E1] border border-[#D9D9D9]">Get started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
