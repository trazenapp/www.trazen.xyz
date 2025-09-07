"use client";

import { createContext, useRef } from "react";
import React from "react";
import DashboardNav from "@/layouts/DashboardNav";
import DashboardSidebar from "@/layouts/DashboardSidebar";

export const ParentRefContext =
  createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);

const PioneerLayout = ({ children }: { children: React.ReactNode }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <ParentRefContext.Provider value={parentRef}>
      <main ref={parentRef} className="relative min-h-screen w-full">
        <DashboardNav pioneer={true} />
        <div className="lg:flex lg:p-5 lg:pr-0 pl-0 lg:mt-0 mt-3 md:pr-0">
          <DashboardSidebar pioneer={true} />
          <div className=" flex-1">{children}</div>
        </div>
      </main>
    </ParentRefContext.Provider>
  );
};

export default PioneerLayout;
