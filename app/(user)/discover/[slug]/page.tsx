"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaArrowLeft } from "react-icons/fa6";

const page = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = use(params);
  const router = useRouter();

  return (
    <div>
      {" "}
      <div className="w-full flex items-center gap-x-6 font-sans mb-4">
        <Button onClick={router.back} className="border-0 bg-transparent">
          <FaArrowLeft />
        </Button>
        <div className="flex gap-x-2.5">
          <p className="text-[#f4f4f4] text-xl font-medium capitalize hidden md:flex lg:flex">
            {slug}
          </p>
        </div>
      </div>
      <div className="gris grid-cols-1">
        <Link
          href="/profile"
          className="border border-[#303030] py-3 px-4 rounded-[12px] w-full flex items-center gap-x-4 text-base text-[#f4f4f4] font-medium font-sans"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://github.com/shadcn.png"
              alt="avatar image"
              width={40}
              height={40}
            />
          </div>
            <p className="text-[#f4f4f4] text-base font-medium">World of Women (WoW)</p>
        </Link>
      </div>
      <Pagination className="font-sans mt-11">
        <PaginationContent className="gap-x-2">
          <PaginationItem>
            <PaginationPrevious href="#" className="px-2.5 py-1.5 rounded-[6px]" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="px-2.5 py-1.5 rounded-[6px]">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="px-2.5 py-1.5 rounded-[6px]">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="px-2.5 py-1.5 rounded-[6px]">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="px-2.5 py-1.5 rounded-[6px]" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="px-2.5 py-1.5 rounded-[6px]" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
