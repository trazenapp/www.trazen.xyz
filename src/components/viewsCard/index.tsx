import React from "react";

import Card from "@/src/components/card";
import { LuUsers } from "react-icons/lu";

interface ViewsCardProps {
  views: number;
}

function ViewsCard({ views }: ViewsCardProps) {
  return (
    <div className="xl:w-[30%] lg:w-[23%] md:w-[18%] w-full">
      <Card className="h-full md:py-7! md:px-5! rounded-xl flex flex-col md:gap-0 gap-5 items-start md:items-center lg:items-start justify-between px-4">
        <div className="w-11 px-1.5 py-2.5 rounded-xl text-2xl flex justify-center items-center bg-[#430B68]"><LuUsers /></div>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-[#A6A6A6]">Total Followers</p>
          <h1 className="text-2xl">{views}</h1>
        </div>
      </Card>
    </div>
  );
}

export default ViewsCard;
