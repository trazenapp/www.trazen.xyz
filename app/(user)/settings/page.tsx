"use client";
import React, { useState } from "react";
import AccountManagementTab from "@/components/profile/accountManagement";
import SecurityTab from "@/components/profile/SecurityTab";

const Settings = () => {
  const [tab, setTab] = useState<"account" | "security">("account");

  return (
    <div className="min-h-screen text-white font-sans w-full">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-0 bg-transparent md:bg-[#161616] h-full w-full relative rounded-lg overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-full md:w-3/12 bg-transparent md:bg-[#161616] p-6">
          <div className="space-y-2 flex flex-row items-center md:flex-col">
            <button
              className={`w-full text-center md:text-left py-3 px-4 cursor-pointer rounded-lg font-medium transition-colors text-xs md:text-base ${
                tab === "account"
                  ? "bg-[#272727] text-white"
                  : "text-gray-400 hover:bg-[#272727]"
              }`}
              onClick={() => setTab("account")}
            >
              Account management
            </button>
            <button
              onClick={() => setTab("security")}
              className={`w-full text-center md:text-left py-3 px-4 cursor-pointer rounded-lg font-medium transition-colors text-xs md:text-base ${
                tab === "security"
                  ? "bg-[#272727] text-white"
                  : "text-gray-400 hover:bg-[#272727]"
              }`}
            >
              Security
            </button>
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 h-[97%] border-l-0 md:border-l md:border-[#303030]"></div>
        {tab === "account" ? <AccountManagementTab /> : <SecurityTab />}
      </div>
    </div>
  );
};

export default Settings;
