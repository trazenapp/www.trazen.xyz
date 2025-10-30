import React from "react";
import Link from "next/link";
import Card from "@/components/card";
import {
  discoverItems,
  getAlphabeticallySortedTags,
} from "@/constants/discover";
import { BiSolidSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const Discover = () => {
  const formattedDiscoverItems = getAlphabeticallySortedTags();
  return (
    <>
      <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
        Discover
      </h4>
      <div className="flex flex-wrap justify-between gap-4">
        {formattedDiscoverItems.map((item) => (
          <Link key={item.name} href={`/discover${item.url}`}>
            <Button className="!px-3 !py-3 rounded-full border cursor-pointer transition-colors duration-300 border-[#303030] bg-[#161616] text-base text-[#c4c4c4] font-normal font-sans !h-fit hover:bg-[#430B68] focus:bg-[#430B68] ">
              <p>{item.name}</p>
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Discover;
