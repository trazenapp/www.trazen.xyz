import React from "react";

import Card from "@/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectCard from "@/components/projectCard";
import DropMenuCard from "@/components/dropMenuCard";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TooltipProps } from "recharts";

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: {
    value: number;
    name: string;
    payload: { date: string; followers: number };
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

const data = [
  { date: "1 Jul", followers: 100 },
  { date: "3 Jul", followers: 150 },
  { date: "7 Jul", followers: 300 },
  { date: "11 Jul", followers: 500 },
  { date: "17 Jul", followers: 900 },
  { date: "22 Jul", followers: 800 },
  { date: "25 Jul", followers: 1150 },
  { date: "29 Jul", followers: 2100 },
  { date: "31 Jul", followers: 2600 },
];

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

function FollowersChart() {
  return (
    <Card className=" rounded-xl md:!p-6 hidden md:flex flex-col h-150 ">
      <div className="w-full flex justify-between">
        <ProjectCard
          className="w-max !h-max md:!py-2 md:!px-4 !block !mt-0"
          key={tempProjectsList[0].name}
        >
          <div className="w-full flex gap-4 justify-between">
            <Avatar className="w-8 h-max rounded-full">
              <AvatarImage src={tempProjectsList[0].logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button className="w-full flex items-center gap-5 justify-between hover:cursor-pointer">
              <span className="text-base text-[#f4f4f4]">
                {tempProjectsList[0].name}
              </span>
              <ChevronDownIcon className="h-3 w-3 text-[#ddd]-600" />
            </button>
          </div>
        </ProjectCard>
        <div className="flex gap-3 items-center">
          <DropMenuCard>
            <button className="w-full flex items-center gap-2 justify-between hover:cursor-pointer">
              <span className="text-sm font-light text-[#f4f4f4]">July</span>
              <ChevronDownIcon className="h-3 w-3 text-[#ddd]-600" />
            </button>
          </DropMenuCard>
          <DropMenuCard>
            <button className="w-full flex items-center gap-2 justify-between hover:cursor-pointer">
              <span className="text-sm font-light text-[#f4f4f4]">2025</span>
              <ChevronDownIcon className="h-3 w-3 text-[#ddd]-600" />
            </button>
          </DropMenuCard>
        </div>
      </div>
      <div className=" mt-9 flex flex-col gap-2 ">
        <p className="text-xs font-light text-[#a6a6a6]">Followers</p>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-[34px] ">2,153</p>
          <div className="bg-[#00bd1c29] py-1 px-2 rounded-sm text-[#00bc1c] ">
            <p className="flex items-center gap-1">
              <ArrowUpRight className="w-5 h-5 font-bold" />
              <span>4.37%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-80 bg-[#161616] py-4 rounded-xl">
        <ResponsiveContainer>
          <AreaChart
            className="[&_svg]:outline-none [&_svg]:focus:outline-none"
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            {/* Gradient fill */}
            <defs>
              <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* X and Y axes */}
            <XAxis
              dataKey="date"
              stroke="#aaa"
              axisLine={false}
              tickLine={false}
            />
            <YAxis stroke="#aaa" axisLine={false} tickLine={false} />

            {/* Tooltip with marker + vertical line */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#a855f7", strokeWidth: 2 }}
            />

            {/* Area curve */}
            <Area
              type="monotone"
              dataKey="followers"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#colorFollowers)"
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 2,
                fill: "#a855f7",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default FollowersChart;
