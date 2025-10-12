import Image from "next/image";
import Link from "next/link";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import img from "@/public/cryptocurrency-usdc.svg";
import { BountyItemResponse } from "@/types/bounties.types";
import { useVisitedLinks } from "@/hooks/useVisitedLinks";

const BountyCard = ({ bounty }: { bounty: BountyItemResponse }) => {
  const avatarUrl =
    bounty?.project?.user?.avatar || "https://github.com/shadcn.png";
    const { isVisited, markVisited } = useVisitedLinks();
  const visited = isVisited(bounty?.link);
  return (
    <Link href={bounty?.link} target="_blank" onClick={() => markVisited(bounty?.link)} className={`${visited ? "opacity-50" : "opacity-100"} transition-opacity`}>
      <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0 ">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-x-3.5 font-sans w-11/12">
            <Avatar className="h-[60px] w-[60px] rounded-full overflow-hidden">
              <AvatarImage src={avatarUrl} className="object-cover w-full" />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm md:text-base text-[#f4f4f4] line-clamp-1">
                {bounty.title}
              </p>
              <p className="flex gap-x-1 items-center">
                <span className="text-[#A6A6A6] text-xs font-light">
                  {bounty?.project?.user?.username}
                </span>
                {bounty.project.is_approved && (
                  <BsPatchCheckFill size={12} color="#B348F9" />
                )}
              </p>
              <div className="flex gap-x-1 items-center text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
                <IoIosTimer />{" "}
                {bounty?.status === "ONGOING" && `${bounty?.duration} left`}
                {bounty?.status === "UPCOMING" &&
                  `Starts in ${bounty?.duration}`}
                {bounty?.status === "COMPLETED" && "Completed"}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-start gap-x-2 w-[17%]">
            {/* <Image src={img} alt="usdc icon" className="w-5 h-5" /> */}
            <p className="text-base font-light font-sans text-[#A6A6A6] line-clamp-1">
              {bounty.reward}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BountyCard;
