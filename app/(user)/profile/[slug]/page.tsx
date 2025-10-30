"use client";
import React, { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feedscard from "@/components/feedsCard";
import { FaArrowLeft, FaSquareXTwitter } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCube } from "react-icons/hi";
import { useAppDispatch, useAppSelector, RootState } from "@/redux/store";
import { getProjectDetail } from "@/redux/slices/projectSlice";

import { Skeleton } from "@/components/ui/skeleton";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const dispatch = useAppDispatch();
  const { slug } = use(params);
  const router = useRouter();

  const { projectDetail, loading, error } = useAppSelector(
    (state) => state.project
  );

  React.useEffect(() => {
    if (slug) {
      dispatch(getProjectDetail(slug));
    }
  }, [slug, dispatch]);

  return (
    <section>
      {loading && (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}

      {!loading && projectDetail && (
        <div>
          <div className="w-full flex items-center gap-x-6 font-sans mb-4">
            <Button onClick={router.back} className="border-0 bg-transparent">
              <FaArrowLeft />
            </Button>
            <div className="flex gap-x-2.5">
              <p className="text-[#f4f4f4] text-xl font-medium flex items-center gap-x-2">
                {projectDetail.name}
                <BsPatchCheckFill size={12} color="#B348F9" />
              </p>
              <p className="text-[#7F7F7F] text-xl font-light">200 posts</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-x-5">
              <Avatar className="w-[120px] h-[120px]">
                <AvatarImage src={`${projectDetail.avatar}`} className="" />
                <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 font-sans">
                <p className="text-[#f4f4f4] text-[28px] font-medium flex items-center gap-x-2 mb-4">
                  {projectDetail.name}{" "}
                  <BsPatchCheckFill size={24} color="#B348F9" />
                </p>
                <p className="text-base font-normal text-[#BCBCBC]">
                  {projectDetail.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-y-4 items-center gap-x-5 font-sans">
              <div className="flex flex-row items-center gap-x-2">
                <IoPeopleOutline color="#7f7f7f" className="text-xl" />
                <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
                  <span>{projectDetail.total_followers}</span>
                  <span className="text-[#7f7f7f] font-normal">Followers</span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <FaSquareXTwitter color="#7f7f7f" className="text-xl" />
                <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
                  <Link
                    href={`mailto:${projectDetail.social}`}
                    className="text-[#1768FF] font-normal"
                  >
                    {projectDetail.social}
                  </Link>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <HiOutlineCube color="#7f7f7f" className="text-xl" />
                <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">
                    Solana . Ethereum
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <RxDashboard color="#7f7f7f" className="text-xl" />
                <p className="text-[#f4f4f4] font-medium text-sm flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">NFTs</span>
                </p>
              </div>
            </div>
            <Button className="font-sans bg-white hover:bg-white text-black rounded-full py-3 mb-4">
              Follow
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
