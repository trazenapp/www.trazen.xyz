import React, { useState } from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
// import { ClipLoader } from "react-spinners";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";

interface PricingCardProps {
  features: string[];
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const PricingCard = ({
  features,
  title,
  isActive,
  onClick,
}: PricingCardProps) => {
  const subtitleString =
    title === "Free"
      ? "Get access to all features for now. Enjoy the entire of Trazen for free."
      : "Pay monthly to access the Trazen features you’ve come to love.";

  return (
    <Card
      className={`!rounded-2xl !p-6 font-sans ${isActive === true ? "bg-[#272727]" : "opacity-30 !bg-[#430B68]"}`}
    >
      <div className="flex flex-col gap-y-3.5 mb-5">
        <h5 className="text-2xl font-medium">{title}</h5>
        <p className="text-base font-normal">{subtitleString}</p>
      </div>
      <h1 className="text-[32px] font-medium mb-5">
        $0<span className="text-xl font-normal">/month</span>
      </h1>
      <div className="flex flex-col gap-y-2.5 mb-5">
        <Card className="!p-4 rounded-[12px] flex items-center gap-x-2.5">
          {isActive ? (
            <IoIosCheckmarkCircle size={20} />
          ) : (
            <FaRegCircle size={20} />
          )}
          <p className="text-base font-normal">
            Instant access to all features
          </p>
        </Card>
        <Card className="!p-4 rounded-[12px] flex items-center gap-x-2.5">
          {isActive ? (
            <IoIosCheckmarkCircle size={20} />
          ) : (
            <FaRegCircle size={20} />
          )}
          <p className="text-base font-normal">Unlimited number of projects</p>
        </Card>
      </div>
      <div className="flex flex-col gap-y-3.5">
        <h6 className="text-xl font-medium">Includes</h6>
        <ul className="flex flex-col gap-x-2.5 gap-y-3.5">
          {features.map((item) => (
            <li key={item} className="flex gap-x-2.5">
              {isActive ? (
                <IoIosCheckmarkCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              <p className="text-base font-normal">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        onClick={onClick}
        className={` rounded-full font-semibold w-full mt-5 ${isActive ? "bg-[#430B68] hover:bg-[#430B68]" : "bg-white hover:bg-white text-[#430B68]"}`}
        disabled={isActive === false}
      >
        {isActive ? "Enjoy" : "Proceed"}
      </Button>
    </Card>
  );
};

export default PricingCard;
