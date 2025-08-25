import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GigsCard from "@/components/gigsCard";
import BountyCard from "@/components/bountyCard";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";

const Gigs = () => {
  return (
    <div>
      <Tabs defaultValue="hiring" className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row gap-x-5">
          <TabsList className="bg-transparent border-b border-b-[#303030] px-11 md:px-[55px] lg:px-[110px] py-0 h-fit flex-1 rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
            <TabsTrigger
              value="hiring"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              Hiring
            </TabsTrigger>
            <TabsTrigger
              value="bounties"
              className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
            >
              Bounties
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="relative w-full h-full" value="hiring">
          <div className="w-full h-full">
            <div className="flex gap-x-2.5 items-center mb-4">
              <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
                <FiSearch color="#9F9F9F" className="text-xl" />
                <Input
                  type="text"
                  placeholder="Search job title or keyword"
                  className="font-sans border-0 focus-visible:ring-0 p-0"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-fit !text-2xl !px-5 bg-transparent border border-[#303030] rounded-2xl">
                    <MdFilterList size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-[#272727] border-0 min-w-[300px] font-sans text-white p-4"
                  align="end"
                >
                  <div className="w-full flex flex-col gap-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-xl">Filter</h5>
                      <Button className="!p-0 !bg-transparent text-[#D396FB]">
                        Clear all
                      </Button>
                    </div>

                    <div className="w-full flex flex-col gap-y-4">
                      <Label htmlFor="country" className="font-medium text-lg">
                        Country
                      </Label>
                      <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
                        <IoLocationOutline color="#9F9F9F" className="text-xl" />
                        <Input
                          type="text"
                          className="font-sans border-0 focus-visible:ring-0 p-0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-3">
                      <h5 className="font-medium text-lg">Job Type</h5>
                      <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Full Time
                              </Label>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Internship
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Freelance
                              </Label>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Volunteer
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-3">
                      <h5 className="font-medium text-lg">Experience Level</h5>
                      <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Entry Level
                              </Label>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Intermediate
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Expert
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-3">
                      <h5 className="font-medium text-lg">On-site/remote</h5>
                      <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                On-Site
                              </Label>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Remote
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms-2"
                              className="border w-4 h-4 rounded-[2px]"
                            />
                            <div className="grid gap-2">
                              <Label
                                htmlFor="terms-2"
                                className="text-sm text-[#A6A6A6] font-normal"
                              >
                                Hybrid
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <GigsCard />
          </div>
        </TabsContent>
        <TabsContent className="relative w-full h-full" value="bounties">
          <div className="flex gap-x-2.5 items-center mb-4">
              <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
                <FiSearch color="#9F9F9F" className="text-xl" />
                <Input
                  type="text"
                  placeholder="Search bounty title or keyword"
                  className="font-sans border-0 focus-visible:ring-0 p-0"
                />
              </div>
            </div>
          <BountyCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gigs;
