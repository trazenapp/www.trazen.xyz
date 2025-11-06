"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/src/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import { fetchHiringDetails } from "@/src/redux/slices/hiringSlice";
import { RootState } from "@/src/redux/store";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getProjectDetail } from "@/src/redux/slices/projectSlice";
import { useTimeAgo } from "@/src/hooks/useTimeAgo";
import { ArrowLeft } from "lucide-react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { hiringPostItem } = useAppSelector((state: RootState) => state.hiring);
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const timeAgo = useTimeAgo(hiringPostItem?.created_at || "");
  const title = projectDetail?.name;
  const fallbackStr = title
    ? [title[0].toUpperCase(), title[title.length - 1]]
    : [];

  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        await dispatch(
          getProjectDetail(hiringPostItem?.project_uuid || "")
        ).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);
  useEffect(() => {
    const getHiringDetails = async () => {
      try {
        await dispatch(fetchHiringDetails({ hire_uuid: slug })).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getHiringDetails();
  }, []);
  return (
    <>
      <div className="w-11/12 md:w-9/12 lg:w-5/12 mb-6">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-x-4 font-sans text-sm"
        >
          <ArrowLeft /> Back
        </Button>
      </div>
      <Card className="p-0! flex flex-col gap-y-5 rounded-2xl! border-0!">
        <div className="border-b border-b-[#303030] flex flex-col pb-5">
          <div className="md:!px-[23px] md:!py-5 !p-3 flex justify-between items-start">
            <div className="flex items-start gap-x-2.5 font-sans">
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  <AvatarImage
                    src={projectDetail?.avatar}
                    className="w-full h-full"
                  />
                  <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                    {fallbackStr}
                  </AvatarFallback>
                </Avatar>
              <div>
                <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
                  {hiringPostItem?.title}
                </p>
                <p className="flex gap-x-1 items-center">
                  <span className="text-[#A6A6A6] text-xs font-light">
                    {projectDetail?.name}
                  </span>
                  <BsPatchCheckFill size={12} color="#B348F9" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Button className="!w-fit !h-fit p-0">
                <FiBookmark size={36} />
              </Button>
              <p className="text-[10px] font-light font-sans text-[#A6A6A6]">
                {timeAgo}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between mb-4 mx-auto w-11/12">
            <div className="flex flex-wrap gap-2.5">
              <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize">
                {hiringPostItem?.type}
              </div>
              <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize">
                {hiringPostItem?.experience}
              </div>
              <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize">
                {hiringPostItem?.location}
              </div>
              <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize">
                {hiringPostItem?.pay_range}
              </div>
              <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans capitalize">
                {hiringPostItem?.location}
              </div>
            </div>
          </div>
          <Link
            href={hiringPostItem?.link || ""}
            target="_blank"
            className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm text-center font-sans font-medium !w-11/12 mx-auto"
          >
            Apply Now
          </Link>
        </div>
        <p
          className="md:!px-[23px] md:!py-5 !p-3 text-[#F4F4F4F4] text-sm font-normal font-sans h-[55vh] overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {hiringPostItem?.description}
        </p>
      </Card>
    </>
  );
}
