"use client";
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
} from "@/src/components/ui/sheet";
import hamburger from "@/public/mobile-menu.svg";
import logo from "@/public/trazen-logo.svg";
import { navMenu } from "@/src/constants/nav-menu";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const router = useRouter();
  return (
    <nav className="flex lg:hidden w-11/12 py-4">
      <Sheet>
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Image src={logo} alt="Trazen Logo" width={145} />
          </Link>
          <SheetTrigger>
            <Image src={hamburger} alt="Trazen Logo" width={30} height={40} />
          </SheetTrigger>
        </div>
        <SheetContent className="bg-[#161616] border-0 rounded-8 md:w-3/4 w-full">
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <Image src={logo} alt="Trazen Logo" className="w-[150px]" />
              </Link>
            </SheetTitle>
            <SheetDescription className="h-[90vh] flex justify-center items-start gap-y-7">
              <div className="w-full flex flex-col gap-y-7 mt-8">
                <div className="flex flex-col justify-center gap-y-7 items-center">
                  {navMenu.map((item) => (
                    <Link
                      href={item.href}
                      key={item.label}
                      className="font-sans font-semibold text-sm text-white hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#430b68] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-y-7 items-center">
                  <Link
                    href="/sign-in"
                    className="font-sans font-semibold text-sm text-white hover:bg-gradient-to-b hover:from-[#BF66FA] hover:to-[#430b68] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                  <Button
                    onClick={() => router.push("/sign-up")}
                    className="rounded-full bg-gradient-to-b from-[#BF66FA] to-[#430b68]"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
