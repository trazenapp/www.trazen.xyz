"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import hamburger from "@/public/mobile-menu.svg";
import logo from "@/public/trazen-logo.svg";
import { navMenu } from "@/constants/nav-menu";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";

const MobileNav = () => {
  const router = useRouter();
  return (
    <nav className="flex lg:hidden w-11/12 py-4">
      <Sheet>
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Image src={logo} alt="Trazen Logo" />
          </Link>
          <SheetTrigger>
            <Image src={hamburger} alt="Trazen Logo" width={30} height={40} />
          </SheetTrigger>
        </div>
        <SheetContent className="bg-[#161616] border-0 rounded-8 md:w-3/4 w-full">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription className="flex flex-col gap-y-7">
              <div className="flex flex-col gap-y-7 items-center">
                {navMenu.map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="font-sans font-semibold text-base text-white hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#9218E1] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-7 items-center">
                <Link
                  href="/"
                  className="font-sans font-semibold text-base text-white hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#9218E1] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Button onClick={() => router.push('/login')} className="rounded-full bg-gradient-to-b from-[#BF66FA] to-[#9218E1] border border-[#D9D9D9]">Get started</Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
