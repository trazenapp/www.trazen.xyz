import React from "react";
import Link from "next/link";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Card className="!p-0 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="border-b border-b-[#303030] flex flex-col pb-5">
        <div className="md:!px-[23px] md:!py-5 !p-3 flex justify-between items-start">
          <div className="flex items-start gap-x-2.5 font-sans">
            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
                Senior Backend Developer
              </p>
              <p className="flex gap-x-1 items-center">
                <span className="text-[#A6A6A6] text-xs font-light">
                  CyptoMachine
                </span>
                <BsPatchCheckFill size={12} color="#B348F9" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button className="!w-fit !h-fit p-0">
              <FiBookmark size={36} />
            </Button>
            <p className="text-base font-light font-sans text-[#A6A6A6]">
              1 day ago
            </p>
          </div>
        </div>
        <div className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-4 justify-between ">
          <div className="flex flex-wrap gap-2.5">
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              <MdOutlineCalendarMonth /> 14 Jan 2023
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              <FaRegClock /> 9:00AM ET
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              <IoIosTimer /> 15 days left
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              Virtual
            </div>
          </div>
        </div>
        <Link
          href="/gigs/senior-backend-development"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm text-center font-sans font-medium !w-11/12 mx-auto"
        >
          View Details
        </Link>
      </div>
      <p
        className="md:!px-[23px] md:!py-5 !p-3 text-[#F4F4F4F4] text-base font-normal font-sans h-[55vh] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        About us Binance Smart Chain is one of the most active and scalable
        blockchain infrastructures in the world, supporting the next generation
        of decentralized applications (dApps). With a focus on low-cost
        transactions, speed, and composability, BSC empowers builders across
        DeFi, GameFi, NFTs, and more. We're scaling the BSC ecosystem and
        seeking skilled engineers to help shape its core technology and backend
        systems. About the Role We are looking for an experienced Backend
        Developer to join the Binance Smart Chain engineering team. In this
        role, you will build and maintain backend services, APIs, and
        infrastructure that power the ecosystem, improve developer experience,
        and support dApp integrations. You'll work closely with blockchain
        engineers, product managers, and ecosystem partners to drive innovation
        and performance on BSC. Key Responsibilities Design and develop robust
        backend systems, APIs, and microservices to support blockchain
        applications and tooling. Collaborate with protocol engineers to build
        scalable integrations with the BSC network. Build and maintain
        developer-facing tools such as RPC services, analytics endpoints,
        explorer APIs, and staking dashboards. Optimize backend services for
        performance, scalability, and high availability. Requirements 3+ years
        of experience as a backend developer, preferably in high-scale systems.
        Proficiency in Node.js, Go, or Python. Experience with building APIs
        (REST and/or GraphQL). Deep understanding of blockchain concepts
        (wallets, gas, transactions, nodes). Familiarity with smart contract
        interactions via Web3.js, Ethers.js, or similar libraries. Nice to Have
        Previous experience building on BSC, Ethereum, or other EVM-compatible
        chains. Familiarity with Binance Chain tools and services (e.g.,
        BSCScan, Beacon Chain). What We Offer Fully remote work with a globally
        distributed team. Competitive compensation in crypto or fiat.
        Opportunity to build critical infrastructure powering one of the world’s
        largest blockchain networks. How to Apply Send your resume,
        GitHub/portfolio, and a short note explaining your interest to
        careers@bsc.org (or use your custom application link). Use the subject
        line: Backend Developer Application – Binance Smart Chain
      </p>
    </Card>
  );
}
