"use client";
import React from "react";
import { usePathname } from "next/navigation";
import DashboardNav from "@/src/layouts/DashboardNav";
import DashboardSidebar from "@/src/layouts/DashboardSidebar";
import DashboardAside from "@/src/layouts/DashboardAside";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main className="relative min-h-screen">
      <DashboardNav />
      <div className="flex justify-center items-center md:p-5 p-4 relative">
        <DashboardSidebar />
        <div
          className={`${pathname === "/settings" ? "w-full xl:w-[75%] lg:ml-[240px] xl:ml-[280px]" : "w-full lg:w-1/2 lg:mr-16"}`}
        >
          {children}
        </div>
        {pathname !== "/settings" && <DashboardAside />}
      </div>
    </main>
  );
};

export default UserLayout;
