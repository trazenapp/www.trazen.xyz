import React from "react";
import Image from "next/image";
import AsideCard from "@/components/asideCard";
import Card from "@/components/card";
import {
  topChains,
  topNiche,
  popularProjects,
} from "@/constants/dashboard-aside";
import bitcoin from "@/public/bitcoin.svg";
import coinbase from "@/public/coinbase.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@solar-icons/react";

const DashboardAside = () => {
  return (
    <div className="w-3/12 border border-[#303030] bg-[#161616] hidden lg:flex flex-col gap-2.5 rounded-2xl p-6">
      <AsideCard title="Top chain" items={topChains} />
      <AsideCard title="Top niche" items={topNiche} />
      <AsideCard title="Popular projects" items={popularProjects} />
      <div className="flex flex-col gap-y-3.5 mt-5">
        <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-medium">
          Top Web3 News
        </h5>
        <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
          <div className="flex items-center gap-x-1.5">
            <Image src={bitcoin} alt="news" width={24} height={24} />
            <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-normal">
              Bitcoin
            </h5>
          </div>
          <p className="text-[#B9B9B9] text-xs ">
            Bitcoin & equities move in tandem again
          </p>
        </Card>
        <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
          <div className="flex items-center gap-x-1.5">
            <Image src={coinbase} alt="news" width={24} height={24} />
            <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-normal">
              Coinbase
            </h5>
          </div>
          <p className="text-[#B9B9B9] text-xs ">
            Tokenized stocks gain traction
          </p>
        </Card>
        <Button className="!py-3 !px-4 !rounded-[12px] flex justify-between items-center font-sans text-[#F4F4F4F4] text-sm font-normal border border-[#303030]">
          <p className="text-[#B9B9B9] text-xs ">
            See More
          </p>
          <ArrowRight weight="Outline" size={20} color="#F4F4F4F4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardAside;
