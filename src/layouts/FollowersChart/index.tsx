"use client";
import React, { useEffect, useMemo, useState } from "react";
import Card from "@/src/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { TooltipProps } from "recharts";
import { FollowersData } from "@/src/types/dashboard.types";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  fetchProjectOverview,
} from "@/src/redux/slices/dashboardSlice";
import { RootState } from "@/src/redux/store";

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: {
    value: number;
    name: string;
    payload: { month: number; count: number };
  }[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 text-white px-3 py-2 rounded-md shadow-md text-sm">
        <p>{label}</p>
        <p>Followers: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

interface FollowersChartProps {
  followersData: FollowersData;
}

function FollowersChart({ followersData }: FollowersChartProps) {
  const dispatch = useAppDispatch();
  const { loading: dashboardLoading, followers } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const projects = followersData?.project || [];
  const chartData = followersData?.chart || [];

  const monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const availableYears = [...new Set(chartData.map((c) => c.year))];
  const currentYear = availableYears[0] || new Date().getFullYear();

  const [selectedProject, setSelectedProject] = useState(
    projects[0]?.uuid || ""
  );
  const [selectedMonth, setSelectedMonth] = useState(
    monthsOfTheYear[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const selectedProjectData = projects.find((p) => p.uuid === selectedProject);

  // 🔁 Fetch project overview whenever filters change
  useEffect(() => {
    if (!selectedProject) return;

    const monthIndex = monthsOfTheYear.indexOf(selectedMonth) + 1;

    const getProjectOverview = async () => {
      try {
        const res = await dispatch(
          fetchProjectOverview({
            uuid: selectedProject,
            month: monthIndex,
            year: selectedYear,
          })
        ).unwrap();

        console.log("Overview fetched:", res);
      } catch (err: any) {
        console.error("Failed to fetch overview:", err);
      }
    };

    getProjectOverview();
  }, [dispatch, selectedProject, selectedMonth, selectedYear]);

  // 🔹 Use followers from Redux if available, otherwise fallback to props
  const chartToUse = followers?.chart || chartData;

  const filteredData = useMemo(() => {
    return chartToUse
      .filter((c: { year: number }) => c.year === selectedYear)
      .map((item: { month: number; count: number }) => ({
        month: monthsOfTheYear[item.month - 1],
        followers: item.count,
      }));
  }, [chartToUse, selectedYear]);

  const totalFollowers = filteredData.reduce((sum: number, d: { followers: number }) => sum + d.followers, 0);

  return (
    <Card className="rounded-xl md:!p-6 hidden md:flex flex-col h-150">
      {/* Header Controls */}
      <div className="w-full flex justify-between flex-wrap gap-4">
        {/* ✅ Project Selector */}
        <Select
          value={selectedProject}
          onValueChange={setSelectedProject}
          disabled={projects.length <= 1}
        >
          <SelectTrigger className="font-sans w-max !h-max md:!py-2.5 md:!px-4 gap-4 border-[#434343] text-[#f4f4f4] rounded-[10px]">
            <Avatar className="w-7 h-max rounded-full">
              <AvatarImage src={selectedProjectData?.avatar} />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <SelectValue
              placeholder={selectedProjectData?.name || "Select project"}
            />
          </SelectTrigger>
          <SelectContent className="font-sans bg-[#161616] border-[#303030]">
            <SelectGroup>
              {projects.map((project) => (
                <SelectItem
                  key={project.uuid}
                  className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                  value={project.uuid}
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* ✅ Month + Year Selector */}
        <div className="flex gap-3 items-center flex-wrap">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="font-sans w-max p-3 border-[#434343] text-[#f4f4f4] rounded-[10px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-sans bg-[#161616] border-[#303030]">
              <SelectGroup>
                {monthsOfTheYear.map((month) => (
                  <SelectItem
                    key={month}
                    className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                    value={month}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* ✅ Year Input */}
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-24 py-1 px-2 bg-transparent border border-[#434343] text-[#f4f4f4] rounded-[10px] focus:outline-none focus:border-[#A01AF7]"
          />
        </div>
      </div>

      {/* Followers Summary */}
      <div className="mt-9 flex flex-col gap-2">
        <p className="text-xs font-light text-[#a6a6a6]">Followers</p>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-[34px]">
            {dashboardLoading ? "..." : totalFollowers}
          </p>
          <div className="bg-[#00bd1c29] py-1 px-2 rounded-sm text-[#00bc1c]">
            <p className="flex items-center gap-1">
              <ArrowUpRight className="w-5 h-5 font-bold" />
              <span>+0%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="w-full h-full bg-[#161616] mt-4 rounded-xl">
        <ResponsiveContainer>
          <AreaChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A01AF74D" stopOpacity={1} />
                <stop offset="100%" stopColor="#A01AF74D" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              stroke="#aaa"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#aaa"
              axisLine={false}
              tickLine={false}
              dataKey="followers"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#A01AF74D", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="followers"
              stroke="#A01AF74D"
              strokeWidth={3}
              fill="url(#colorFollowers)"
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 2,
                fill: "#A01AF74D",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default FollowersChart;
