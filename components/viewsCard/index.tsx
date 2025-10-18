import React from "react";

import Card from "@/components/card";
import Image from "next/image";
import logo from "@/public/views.png";

interface ViewsCardProps {
  views: number;
}

function ViewsCard({ views }: ViewsCardProps) {
  return (
    <div className="xl:w-[30%] lg:w-[23%] md:w-[18%] w-full">
      <Card className="h-full md:!py-7 md:!px-5 rounded-xl flex flex-col md:gap-0 gap-5 items-start md:items-center lg:items-start justify-between px-4">
        <Image src={logo} alt="viewsSheet" width={45} />
        <div className="flex flex-col gap-[6px]">
          <p className="text-xs text-[#A6A6A6]">Overall views</p>
          <h1 className="text-2xl">{views}</h1>
        </div>
      </Card>
    </div>
  );
}

export default ViewsCard;
