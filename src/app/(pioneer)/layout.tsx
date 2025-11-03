"use client";

import { useRef } from "react";
import React from "react";
import DashboardNav from "@/src/layouts/DashboardNav";
import DashboardSidebar from "@/src/layouts/DashboardSidebar";
import { ParentRefContext } from "@/src/context/ParentalRefContext";

const PioneerLayout = ({ children }: { children: React.ReactNode }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <ParentRefContext.Provider value={parentRef}>
      <main ref={parentRef} className="relative min-h-screen w-full">
        <DashboardNav pioneer={true} editProject={true} />
        <div className="lg:flex lg:justify-center pl-0 lg:mt-0 mt-3 md:pr-0">
          <DashboardSidebar pioneer={true} />
          {children}
        </div>
      </main>
    </ParentRefContext.Provider>
  );
};

export default PioneerLayout;
