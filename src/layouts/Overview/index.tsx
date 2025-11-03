"use client";
import React, { useEffect } from "react";

import OverviewInfo from "../OverviewInfo";
import FollowersChart from "../FollowersChart";
import { RootState } from "@/src/redux/store";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getProject, setLoading } from "@/src/redux/slices/projectSlice";
import { fetchProjectOverview } from "@/src/redux/slices/dashboardSlice";
import {
  ProjectDetail,
} from "@/src/types/project.types";

type OverviewProps = {
  setTabValue: (value: string) => void;
};

function Overview({ setTabValue }: OverviewProps) {
  const dispatch = useAppDispatch();
  const { loading, projects } = useAppSelector(
    (state: RootState) => state.project
  );
  const { loading: dashboardLoading, followers } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(getProject());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const getProjectOverView = () => {
      projects?.forEach(async(project: ProjectDetail) => {
        try {
          console.log(project?.uuid);
        dispatch(setLoading(true));
         const res = await dispatch(fetchProjectOverview({ uuid: project?.uuid, month: 1, year: 2025 })).unwrap();
         console.log(res);
        dispatch(setLoading(false));
        return res;
      } catch (err: any) {
        console.log(err);
      }
        dispatch(
          fetchProjectOverview({ uuid: project?.uuid, month: 1, year: 2025 })
        );
      });
      
    };

    getProjectOverView()
  }, [projects, dispatch]);

  return (
    <div className="flex flex-col gap-5 ">
      <OverviewInfo setTabValue={setTabValue} views={followers?.OverviewCount || 0} />
      <FollowersChart followersData={followers} />
    </div>
  );
}

export default Overview;
