import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import img from "@/public/trazen-inverse.svg"

const Cta = () => {
  return (
    <section className="w-11/12 md:w-10/12 mt-[120px]">
      <Card className="flex px-4 md:!px-[60px] md:!py-[76px] relative">
        <div className={`w-full lg:w-7/12 flex flex-col gap-y-6`}>
          <h4 className="font-sans font-semibold text-[32px] md:text-4xl">
            Stay Ahead of the Curve in Web3
          </h4>
          <p className="font-sans text-base font-normal">
            Don’t just catch up, stay ahead. Get personalized updates, real-time
            project drops, and meaningful community insights delivered straight
            to your feed
          </p>
          <Link href="#" className="flex">
            <Button className="relative p-[1px] rounded-full bg-gradient-to-br from-[#C83BE5] to-[#2C05334D] hover:from-[#9218E1] hover:to-[#BF66FA] transition w-full lg:w-fit">
              <div className="bg-[#161616] rounded-full px-6 py-4 text-white flex items-center justify-center gap-x-3.5 w-full">
                Learn more <ArrowRight />
              </div>
            </Button>
          </Link>
        </div>
        <Image src={img} alt="svg logo" className="lg:flex hidden absolute top-7/12 -translate-y-1/2 -right-20" />
      </Card>
    </section>
  );
};

export default Cta;
