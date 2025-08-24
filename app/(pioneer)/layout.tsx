"use client";

import React from "react";
import DashboardNav from "@/layouts/DashboardNav";
import DashboardSidebar from "@/layouts/DashboardSidebar";

const PioneerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen">
      <DashboardNav pioneer={true} />
      <div className="flex lg:p-5 lg:pr-0 pl-0 lg:mt-0 mt-3 md:pr-0">
        <DashboardSidebar pioneer={true} />
        <div className=" flex-1">{children}</div>
      </div>
    </main>
  );
};

export default PioneerLayout;
