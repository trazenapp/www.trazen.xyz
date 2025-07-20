import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users_solutions, project_pioneers } from "@/constants/solutions";
import Heading from "@/components/heading";
import Badge from "@/components/badge";
import Card from "@/components/card";

const Solutions = () => {
  return (
    <section className="w-11/12 md:w-10/12 mt-[120px] flex flex-col items-center justify-center relative">
      <div className="w-full md:w-8/12 flex flex-col gap-y-6 mb-[60px]">
        <Badge>Solutions</Badge>
        <Heading
          className="text-center"
          subText="Whether you're here to stay informed or to share what you're building, we’ve created an experience tailored to your needs"
        >
          The Web3 Feed That Works for{" "}
          <span className="bg-gradient-to-r italic from-[#9218E1] to-[#BF66FA] text-transparent bg-clip-text">
            Enthusiasts
          </span>
        </Heading>
      </div>
      <Tabs defaultValue="users" className="w-full flex flex-col items-center">
        <TabsList className="bg-[#161616] py-1.5 px-2 md:p-[11px] h-fit flex rounded-full w-full md:w-8/12 mb-8 md:mb-12">
          <TabsTrigger
            className="data-[state=active]:bg-[#430B68] p-[5px] md:p-2.5 h-fit hover:cursor-pointer rounded-full text-[#F4F4F4F4] font-sans text-base md:text-xl"
            value="users"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#430B68] p-[5px] md:p-2.5 h-fit hover:cursor-pointer rounded-full text-[#F4F4F4F4] font-sans text-base md:text-xl"
            value="pioneers"
          >
            Project pioneers
          </TabsTrigger>
        </TabsList>
        <TabsContent className="relative" value="users">
          <div
            className={`w-[250px] md:w-[600px] h-[250px] md:h-[600px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-1/2 left-1/2 -translate-1/2`}
          ></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {users_solutions.map((item, index) => (
              <Card
                key={index}
                className="p-4 md:!px-6 md:!py-6 flex flex-col gap-y-6"
              >
                <div className="w-14 h-14 rounded-[10px] border border-[#434343] flex justify-center items-center font-sans text-white">
                  <Image src={item.image} alt={item.title} className="" />
                </div>
                <h6 className="text-xl font-semibold font-sans">{item.title}</h6>
                <p className="text-base font-normal leading-7 font-sans">
                  {item.subtitle}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent className="relative" value="pioneers">
          <div
            className={`w-[250px] md:w-[600px] h-[250px] md:h-[600px] rounded-full bg-radial/decreasing from-[#7212AF] to-transparent to-58% absolute top-1/2 left-1/2 -translate-1/2`}
          ></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {project_pioneers.map((item, index) => (
              <Card
                key={index}
                className="p-4 md:!px-6 md:!py-6 flex flex-col gap-y-6"
              >
                <div className="w-14 h-14 rounded-[10px] border border-[#434343] flex justify-center items-center font-sans text-white">
                  <Image src={item.image} alt={item.title} className="" />
                </div>
                <h6 className="text-xl font-semibold font-sans">{item.title}</h6>
                <p className="text-base font-normal leading-7 font-sans">
                  {item.subtitle}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Solutions;
