"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HiringCard from "@/components/hiringCard";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPublicHiring } from "@/redux/slices/hiringSlice";
import { fetchPrivatePosts } from "@/redux/slices/postSlice";

const Hiring = () => {
  const dispatch = useAppDispatch();
  const { loading, hiringPosts, bookmark } = useAppSelector((state) => state.hiring);

  // const observer = useRef<IntersectionObserver | null>(null);
  // const lastPostRef = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         dispatch(
  //           fetchPublicPosts({
  //             search: "",
  //             page: pagination.page + 1,
  //             limit: pagination.limit,
  //           })
  //         );
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore, pagination.page, pagination.limit, dispatch]
  // );

  useEffect(() => {
    dispatch(fetchPublicHiring());
  }, [dispatch]);

  return (
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

      <div className="flex flex-col gap-y-4">
        {hiringPosts.map((post) => {
          return loading ? (
            <Skeleton key={post.uuid} className="w-full h-[200px] my-4" />
          ) : (
            <HiringCard key={post.id} post={post} bookmark={bookmark} />
          );
        })}
      </div>
    </div>
  );
};

export default Hiring;
