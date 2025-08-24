"use client"
import React from "react";
import { usePathname } from "next/navigation";
import DashboardNav from "@/layouts/DashboardNav";
import DashboardSidebar from "@/layouts/DashboardSidebar";
import DashboardAside from "@/layouts/DashboardAside";

const UserLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();

  return <main className="relative min-h-screen">
    <DashboardNav />
    <div className="flex gap-x-4 md:p-5 p-4">
      <DashboardSidebar />
      <div className="flex-1">
        {children}
      </div>
      {pathname !== "/gigs" && pathname !== "/settings" && <DashboardAside />}
    </div>
  </main>;
};

export default UserLayout;
