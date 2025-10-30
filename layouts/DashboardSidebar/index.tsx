"use client";
import React, { useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/trazen-logo-white.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AiOutlinePlus } from "react-icons/ai";
import { userSidebarMenu } from "@/constants/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setShow } from "@/redux/slices/dashboardSidebarSlice";
import { fetchProfile } from "@/redux/slices/userSlice";
import { ArrowRight } from "lucide-react";
import { Login, Profile } from "iconsax-reactjs"

const DashboardSidebar = ({ pioneer = false }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { show } = useAppSelector((state: RootState) => state.dashboardSidebar);
  const { profile } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        dispatch(setShow(false));
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      {show && (
        <div
          onClick={() => dispatch(setShow(false))}
          className="lg:hidden flex w-screen h-screen fixed inset-0 z-10 bg-[#0B0B0B]/50 backdrop-blur-xs"
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`lg:top-[90px] lg:self-start lg:border lg:border-[#303030] lg:rounded-2xl xl:p-6 px-4 py-6 bg-[#0B0B0B] lg:bg-[#161616] w-9/12 lg:w-[20%] md:w-4/12 lg:h-[85%] h-screen fixed top-0 lg:left-4 left-0 z-20 lg:z-5 transition-all duration-200 ${show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${pioneer ? "xl:!w-[19%]" : ""}`}
      >
        <Link href="/" className="flex lg:hidden mb-5">
          <Image src={logo} alt="logo" width={100} />
        </Link>
          <Collapsible className="mb-6 w-full bg-[#272727] lg:rounded-2xl rounded-full p-2.5 flex flex-col justify-between items-center gap-2.5">
            <CollapsibleTrigger className="flex items-center gap-2.5 w-full">
              <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="font-sans w-8/12">
                <div className="text-white text-left text-sm md:text-base font-bold w-full">
                  {profile?.username}
                </div>
                <div className="text-[#7B7B7B] text-xs md:text-sm font-light w-full line-clamp-1">
                  {profile?.email}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col items-start gap-y-2.5 w-full">
              <Separator className="border-[#555555]" />
              <Button className="flex gap-x-2.5 justify-start font-sans text-sm font-normal text-[#F4F4F4] !p-0 bg-transparent w-full">
                <Profile /> Switch users
              </Button>
              <Button className="flex gap-x-2.5 justify-start font-sans text-sm font-normal text-[#F4F4F4] !p-0 bg-transparent w-full">
                <Login /> Sign out
              </Button>
            </CollapsibleContent>
          </Collapsible>
        <ul className="flex flex-col gap-y-3 w-full">
          {userSidebarMenu.map((item) => (
            <li key={item.label} className="w-full">
              <Link
                href={item.href}
                onClick={() => dispatch(setShow(false))}
                className={`flex items-center gap-2.5 py-2 px-1.5 rounded-[10px]  hover:text-white transition-all duration-200 font-sans  ${
                  pathname === item.href
                    ? "bg-[#430B68] font-medium text-white"
                    : "font-normal text-[#7F7F7F]"
                }`}
              >
                {pathname === item.href ? item.isActiveIcon : item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-1/12 left-0 w-full px-4 lg:hidden">
          {profile?.role === "PIONEER" ? (
            <Button
              // disabled
              onClick={() => router.push("/dashboard")}
              className="flex !gap-x-2.5 rounded-full font-sans bg-[#430B68] !py-3 !px-8 w-full"
            >
              Dashboard
            </Button>
          ) : (
            <Button className="flex !gap-x-2.5 rounded-full font-sans bg-[#430B68] !py-3 !px-8 w-full">
              Create Project <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
