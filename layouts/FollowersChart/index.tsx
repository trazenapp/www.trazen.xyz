import React, { useState } from "react";

import Card from "@/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
const date = new Date();
const currentMonth = date.toLocaleString("default", { month: "long" });
const startYear = 2025;
const currentYear = date.getFullYear();

const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
);

console.log(years);

function FollowersChart() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedProject, setSelectedProject] = useState(
    tempProjectsList[0].name
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const index = tempProjectsList.findIndex(
    (project) => project.name === selectedProject
  );

  return (
    <Card className=" rounded-xl md:!p-6 hidden md:flex flex-col h-150 ">
      <div className="w-full flex justify-between">
        <Select
          value={selectedProject}
          onValueChange={(val) => setSelectedProject(val)}
        >
          <SelectTrigger className="font-sans w-max !h-max md:!py-2.5 md:!px-4 !mt-0 gap-4 border-[#434343] text-[#f4f4f4] rounded-[10px]">
            <Avatar className="w-7 h-max rounded-full">
              <AvatarImage src={tempProjectsList[index].logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-sans bg-[#161616] border-[#303030]">
            <SelectGroup>
              {tempProjectsList.map((project) => (
                <SelectItem
                  className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                  value={project.name}
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-3 items-center">
          <Select
            value={selectedMonth}
            onValueChange={(val) => setSelectedMonth(val)}
          >
            <SelectTrigger className="font-sans w-max p-3  border-[#434343] text-[#f4f4f4] rounded-[10px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-sans bg-[#161616] border-[#303030]">
              <SelectGroup>
                {monthsOfTheYear.map((month) => (
                  <SelectItem
                    className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                    value={month}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={`${selectedYear}`}
            onValueChange={(val) => setSelectedYear(+val)}
          >
            <SelectTrigger className="font-sans w-max p-3  border-[#434343] text-[#f4f4f4] rounded-[10px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-sans bg-[#161616] border-[#303030]">
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem
                    className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                    value={`${year}`}
                  >
                    {`${year}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <DropMenuCard>
            <button className="w-full flex items-center gap-2 justify-between hover:cursor-pointer">
              <span className="text-sm font-light text-[#f4f4f4]">2025</span>
              <ChevronDownIcon className="h-3 w-3 text-[#ddd]-600" />
            </button>
          </DropMenuCard> */}
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

      <div className="w-full h-full bg-[#161616] mt-4 rounded-xl">
        <ResponsiveContainer>
          <AreaChart
            className="[&_svg]:outline-none [&_svg]:focus:outline-none"
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A01AF74D" stopOpacity={1} />
                <stop offset="100%" stopColor="#A01AF74D" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              stroke="#aaa"
              axisLine={false}
              tickLine={false}
            />
            <YAxis stroke="#aaa" axisLine={false} tickLine={false} />

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
