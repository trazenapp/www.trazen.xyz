"use client"
import React from "react";

import OverviewInfo from "../OverviewInfo";
import FollowersChart from "../FollowersChart";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProject, setLoading } from "@/redux/slices/projectSlice";

type OverviewProps = {
  setTabValue: (value: string) => void;
};

function Overview({ setTabValue }: OverviewProps) {
  const dispatch = useAppDispatch();
  const { loading, projects } = useAppSelector(
    (state: RootState) => state.project
  );

  const allProjects = projects?.projects as [];
  return (
    <div className="flex flex-col gap-5 ">
      <OverviewInfo setTabValue={setTabValue} />
      <FollowersChart />
    </div>
  );
}

export default Overview;
