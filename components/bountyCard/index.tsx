import Image from "next/image";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import img from "@/public/cryptocurrency-usdc.svg";

const BountyCard = () => {
  return (
    <Card className="md:!px-[23px] md:!py-5 !p-3 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-x-2.5 font-sans">
          <Avatar className="h-[60px] w-[60px] rounded-full overflow-hidden">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
              Polygon street art bounty
            </p>
            <p className="flex gap-x-1 items-center">
              <span className="text-[#A6A6A6] text-xs font-light">
                CyptoMachine
              </span>
              <BsPatchCheckFill size={12} color="#B348F9" />
            </p>
            <div className="flex gap-x-1 items-center text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              <IoIosTimer /> 15 days left
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Image src={img} alt="usdc icon" className="w-5 h-5" />
          <p className="text-base font-light font-sans text-[#A6A6A6]">
            350
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BountyCard;
