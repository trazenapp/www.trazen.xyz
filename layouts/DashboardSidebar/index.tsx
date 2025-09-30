"use client";
import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/trazen-logo-white.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlinePlus } from "react-icons/ai";
import { userSidebarMenu } from "@/constants/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setShow } from "@/redux/slices/dashboardSidebarSlice";
import { fetchProfile } from "@/redux/slices/userSlice";

const DashboardSidebar = ({ pioneer = false }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
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
        className={`lg:top-[90px] lg:self-start lg:border lg:border-[#303030] lg:rounded-2xl xl:p-6 px-4 py-6 bg-[#0B0B0B] lg:bg-[#161616] w-9/12 lg:w-[20%] md:w-4/12 lg:h-[85%] h-screen fixed top-0 lg:left-4 left-0 z-20 lg:z-5 transition-all duration-200 ${show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${pioneer ? "xl:!w-[19%]" : ""} `}
      >
        <Link href="/" className="flex lg:hidden mb-5">
          <Image src={logo} alt="logo" width={100} />
        </Link>
        <div className="mb-6 w-full bg-[#272727] lg:rounded-2xl rounded-full p-2.5 flex justify-between items-center gap-2.5">
          <div className="flex items-center gap-2.5 w-full">
            <Avatar className="">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-sans w-8/12">
              <div className="text-white text-sm md:text-base font-bold w-full">
                {profile?.username}
              </div>
              <div className="text-[#7B7B7B] text-xs md:text-sm font-light w-full line-clamp-1">
                {profile?.email}
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default DashboardSidebar;
