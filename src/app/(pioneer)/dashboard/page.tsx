"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MdFilterList } from "react-icons/md";
import { Button } from "@/src/components/ui/button";
import Card from "@/src/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import Overview from "@/src/layouts/Overview";
import { Projects } from "@/src/components/projects";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector, RootState } from "@/src/redux/store";
import { fetchProfile } from "@/src/redux/slices/userSlice";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { show } = useAppSelector((state: RootState) => state.dashboardSidebar);
  const { profile, loading } = useAppSelector((state: RootState) => state.user);
  const [tabValue, setTabValue] = useState("overview");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
  if (loading) return;

  if (!profile) return;

  if (profile?.role === "USER") {
    router.back();
  }
}, [profile, loading, router]);


  return (
    <div className="xl:w-[81%] lg:w-[80%] ml-auto font-[Geist] relative">
      <h2 className="hidden lg:block pl-6 pr-6 my-5">Dashboard</h2>
      <Button className="hidden md:flex md:gap-x-2.5! gap-x-7 rounded-full font-sans bg-[#430B68] lg:py-3! lg:px-5! py-2 px-3 absolute lg:top-[18px] lg:right-10 md:right-[18px] md:top-[-3px] z-10 text-sm top-10 ">
        <PlusIcon className="h-5.5! w-5.5! text-white" />
        New Project
      </Button>
      <Tabs value={tabValue} className="w-full flex flex-col items-center">
        <div className="w-full border-b border-b-[#303030] pl-6 pr-6">
          <TabsList className="bg-transparent max-md:w-full flex  gap-10 font-sans p-0">
            <div className="max-md:w-[50%] max-md:text-center">
              <TabsTrigger
                value="overview"
                className="text-[#9F9F9F] font-normal py-2 px-0 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:border-b-white data-[state=active]:rounded-none data-[state=active]:bg-transparent hover:cursor-pointer w-max "
                onClick={(e) => setTabValue("overview")}
              >
                Overview
              </TabsTrigger>
            </div>
            <div className="max-md:w-[50%] max-md:text-center">
              <TabsTrigger
                value="project"
                className="text-[#9F9F9F] font-normal py-2 px-0 data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:border-b-white data-[state=active]:rounded-none data-[state=active]:bg-transparent hover:cursor-pointer w-max "
                onClick={(e) => setTabValue("project")}
              >
                Project
              </TabsTrigger>
            </div>
          </TabsList>
        </div>
        {tabValue === "project" ? (
          <div className="md:hidden block px-6 w-full">
            <Button className=" md:hidden flex md:gap-x-2.5! gap-x-7 rounded-full font-sans bg-[#430B68] lg:py-3! lg:px-5! py-2 px-3 max-md:mt-4 max-md:w-full ">
              <PlusIcon className="h-5.5! w-5.5! text-white" />
              New Project
            </Button>
          </div>
        ) : (
          ""
        )}
        {tabValue === "overview" && (
          <TabsContent
            className="relative w-full h-full pl-6 pr-6 pt-6"
            value="overview"
          >
            <div className="w-full h-full">
              <Overview setTabValue={setTabValue} />
            </div>
          </TabsContent>
        )}
        {tabValue === "project" && (
          <TabsContent
            className="relative w-full h-full pl-6 pr-6 md:pt-6"
            value="project"
          >
            <Projects />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;
