import React from 'react'
import Image from "next/image";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";

interface AsideCardProps {
  title: string;
  items: {
    name: string;
    img?: string;
  }[];
  onClick?: () => void;
}


const AsideCard = ({ title, items, onClick }: AsideCardProps) => {

  return (
    <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2.5 font-sans text-[#F4F4F4F4] text-sm font-normal">
        <h5 className="font-medium">{title}</h5>
        <ul className="flex flex-col gap-y-3.5">
          {items?.map((item) => {
            // console.log(item.img.src)
            return(
            <li key={item.name} className="flex justify-between items-center gap-x-2.5">
              <div className="flex items-center gap-x-2.5">
                {item.img &&<Image
                  src={item.img}
                  alt={item.name}
                  width={24}
                  height={24}
                />}
                <span>{item.name}</span>
              </div>
                <Button onClick={onClick} className="bg-[#F4F4F4F4] !py-1.5 !px-4 text-[#0B0B0B] text-[10px] rounded-full">Follow</Button>
            </li>
          )})}
        </ul>
      </Card>
  )
}

export default AsideCard