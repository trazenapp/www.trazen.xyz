import React from "react";
import Link from "next/link";
import Card from "@/components/card";
import { Niches, Chains } from "@/constants/discover";
import { BiSolidSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const Discover = () => {
  console.log(Niches, "niches");
  console.log(Chains, "chains");
  return (
    <>
      <div className="mb-10">
        <h4 className="mb-4 text-white text-xl font-medium font-sans flex">
          Chains
        </h4>
        <div className="flex flex-wrap gap-4">
          {Chains.map((item) => (
            <Link key={item.name} href={`/discover${item.url}`}>
              <Button className="!px-3 !py-3 rounded-full border cursor-pointer transition-colors duration-300 border-[#303030] bg-[#161616] text-base text-[#c4c4c4] font-normal font-sans !h-fit hover:bg-[#430B68] focus:bg-[#430B68] ">
                <p>{item.name}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-white text-xl font-medium font-sans flex">
          Niche
        </h4>
        <div className="flex flex-wrap gap-4">
          {Niches.map((item) => (
            <Link key={item.name} href={`/discover${item.url}`}>
              <Button className="!px-3 !py-3 rounded-full border cursor-pointer transition-colors duration-300 border-[#303030] bg-[#161616] text-base text-[#c4c4c4] font-normal font-sans !h-fit hover:bg-[#430B68] focus:bg-[#430B68] ">
                <p>{item.name}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
