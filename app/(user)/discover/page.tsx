import React from "react";
import Link from "next/link";
import Card from "@/components/card";
import { discoverItems } from "@/constants/discover";
import { BiSolidSearch } from "react-icons/bi";

const Discover = () => {
  return (
    <>
      <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
        Discover
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discoverItems.map((item) => (
          <Link
            key={item.title}
            href={`/discover/${item.url}`}
            className="block"
          >
            <Card className="!px-3 !py-3.5 rounded-[12px] border border-[#303030] bg-[#161616] h-full flex flex-row md:flex-col items-center md:items-start gap-2.5 text-base text-[#c4c4c4] font-normal font-sans">
              <div className="p-2 border border-[#430B68]/[50%] rounded-[6px] bg-[#430B68]/[20%]">
                <BiSolidSearch color="#DDDDDD" size={20} />
              </div>
              <p>{item.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Discover;
