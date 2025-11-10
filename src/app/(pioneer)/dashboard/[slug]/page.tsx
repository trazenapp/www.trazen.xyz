"use client";
import React, { useState, useMemo, use, useEffect, useCallback } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import EventCard from "@/src/components/eventCard";
import BountyCard from "@/src/components/bountyCard";
import HiringCard from "@/src/components/hiringCard";
import { FaArrowLeft, FaSquareXTwitter } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { HiOutlineCube } from "react-icons/hi";
import Image from "next/image";
import Card from "@/src/components/card";
import announcementImage from "@/public/announcement-image.svg";
import { ArrowRight } from "@solar-icons/react";
import { ChevronRightIcon } from "lucide-react";
import ProjectCard from "@/src/components/projectCard";
import NewPost from "@/src/components/newPost";
import EditProject from "@/src/components/editProject";
import { RootState } from "@/src/redux/store";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchPrivatePosts } from "@/src/redux/slices/postSlice";
import { getEventsPrivate } from "@/src/redux/slices/eventSlice";
import { fetchPrivateHiring } from "@/src/redux/slices/hiringSlice";
import { getBountiesPrivate } from "@/src/redux/slices/bountiesSlice";
import {
  getProject,
  setLoading,
  getProjectDetail,
} from "@/src/redux/slices/projectSlice";
import FeedsCard from "@/src/components/feedsCard";
import { ProjectDetail } from "@/src/types/project.types";
import { chainOptions, nicheOptions } from "@/src/constants/options";
import { RxDashboard } from "react-icons/rx";
import { IoPeopleOutline } from "react-icons/io5";

const MemoizedFeedsCard = React.memo(FeedsCard);
const MemoizedEventCard = React.memo(EventCard);
const MemoizedHiringCard = React.memo(HiringCard);
const MemoizedBountyCard = React.memo(BountyCard);

const LoadingSkeleton = React.memo(() => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-full h-[200px] my-4" />
      ))}
    </>
  );
});

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

const Profile = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projectDetail, projects } = useAppSelector(
    (state: RootState) => state.project
  );
  const {
    privatePosts,
    loading: postLoading,
    pagination: postPagination,
    hasMore: postHasMore,
  } = useAppSelector((state) => state.post);
  const {
    events,
    loading: eventLoading,
    pagination: eventPagination,
    hasMore: eventHasMore,
  } = useAppSelector((state: RootState) => state.events);
  const {
    hiringPosts,
    loading: hiringLoading,
    pagination: hiringPagination,
    hasMore: hiringHasMore,
  } = useAppSelector((state: RootState) => state.hiring);
  const {
    bountyData,
    loading: bountyLoading,
    pagination: bountyPagination,
    hasMore: bountyHasMore,
  } = useAppSelector((state: RootState) => state.bounties);

  const [page, setPage] = useState({
    feed: 1,
    events: 1,
    hiring: 1,
    bounties: 1,
  });
  const [activeTab, setActiveTab] = useState("feed-post");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const fetchInitialData = async () => {
    try {
      const project = await dispatch(getProjectDetail(slug)).unwrap();
      await Promise.all([
        dispatch(getProject()).unwrap(),
        dispatch(
          fetchPrivatePosts({
            project_uuid: project?.uuid as string,
            page: 1,
            limit: 10,
          })
        ).unwrap(),
        dispatch(
          getEventsPrivate({
            project_uuid: project?.uuid as string,
            page: 1,
            limit: 10,
          })
        ).unwrap(),
        dispatch(
          getBountiesPrivate({
            project_uuid: project?.uuid as string,
            page: 1,
            limit: 10,
          })
        ).unwrap(),
        dispatch(
          fetchPrivateHiring({
            project_uuid: project?.uuid as string,
            status: "",
            page: 1,
            limit: 10,
          })
        ).unwrap(),
      ]);
    } catch (err: any) {
      console.log("Error fetching initial data:", err);
    }
  };

  const otherProjects =
    projects?.filter((project: ProjectDetail) => project.uuid !== slug) || [];

  const niches = projectDetail?.categories
    ?.map((c: any) => c.toLowerCase().replace(/\s+/g, "-"))
    .join(", ");

  const chainValues = chainOptions.map((option) => option.value);
  const projectChains = projectDetail?.categories.filter((category) =>
    chainValues.includes(category)
  );

  const nichesValues = nicheOptions.map((item) => item.value);
  const projectNiche = projectDetail?.categories.filter((niche) =>
    nichesValues.includes(niche)
  );

  useEffect(() => {
    fetchInitialData();
  }, [dispatch, slug]);

  const loadMore = useCallback(() => {
    if (!inView) return;

    switch (activeTab) {
      case "feed-post":
        if (postHasMore && !postLoading) {
          setPage((prev) => {
            const nextPage = prev.feed + 1;
            dispatch(
              fetchPrivatePosts({
                project_uuid: projectDetail?.uuid as string,
                page: nextPage,
                limit: postPagination.limit,
              })
            );
            return { ...prev, feed: nextPage };
          });
        }
        break;
      case "events":
        if (eventHasMore && !eventLoading) {
          setPage((prev) => {
            const nextPage = prev.events + 1;
            dispatch(
              getEventsPrivate({
                project_uuid: projectDetail?.uuid as string,
                page: nextPage,
                limit: eventPagination.limit,
              })
            );
            return { ...prev, events: nextPage };
          });
        }
        break;
      case "hiring":
        if (hiringHasMore && !hiringLoading) {
          setPage((prev) => {
            const nextPage = prev.hiring + 1;
            dispatch(
              fetchPrivateHiring({
                project_uuid: projectDetail?.uuid as string,
                status: "",
                page: nextPage,
                limit: hiringPagination.limit,
              })
            );
            return { ...prev, hiring: nextPage };
          });
        }
        break;
      case "bounties":
        if (bountyHasMore && !bountyLoading) {
          setPage((prev) => {
            const nextPage = prev.bounties + 1;
            dispatch(
              getBountiesPrivate({
                project_uuid: projectDetail?.uuid as string,
                page: nextPage,
                limit: bountyPagination.limit,
              })
            );
            return { ...prev, bounties: nextPage };
          });
        }
        break;
      default:
        break;
    }
  }, [
    inView,
    activeTab,
    postHasMore,
    postLoading,
    postPagination.limit,
    eventHasMore,
    eventLoading,
    eventPagination.limit,
    hiringHasMore,
    hiringLoading,
    hiringPagination.limit,
    bountyHasMore,
    bountyLoading,
    bountyPagination.limit,
    dispatch,
  ]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  if (!projectDetail) {
    return (
      <div className="xl:w-[50%] lg:w-[50%]">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <>
      <div className="xl:w-[50%] lg:w-[50%] lg:flex filter xl:-ml-16 lg:-ml-11">
        <div className="relative md:w-full max-lg:px-4">
          <div className="w-full flex items-center gap-x-6 font-sans mb-4">
            <Button onClick={router.back} className="border-0 bg-transparent">
              <FaArrowLeft />
            </Button>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-x-5">
              <div className="">
                <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center overflow-hidden relative">
                  <Image
                    src={
                      (projectDetail?.avatar as string) ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-center items-center gap-x-4 mt-4">
                  <p className="text-[#f4f4f4] font-medium text-xs flex gap-x-1">
                    <Link
                      href={projectDetail?.social as string}
                      target="blank"
                      className="text-[#1768FF] font-normal"
                    >
                      <FaSquareXTwitter
                        color="#7f7f7f"
                        className="text-[1.04rem]"
                      />
                    </Link>
                  </p>
                  <p className="text-[#f4f4f4] font-medium text-xs flex gap-x-1">
                    <Link
                      href={projectDetail?.whitepaper as string}
                      target="blank"
                      className="text-[#1768FF] font-normal"
                    >
                      <CgFileDocument
                        color="#7f7f7f"
                        className="text-[1.04rem]"
                      />
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-x-5">
                <div className="flex-1 font-sans">
                  <p className="text-[#f4f4f4] text-xl font-medium flex items-center gap-x-2 mb-4">
                    {projectDetail?.name}{" "}
                    {projectDetail?.is_approved && (
                      <BsPatchCheckFill size={24} color="#B348F9" />
                    )}
                  </p>
                  <p className="sm:text-sm text-[12px] font-normal text-[#BCBCBC]">
                    {projectDetail?.description}
                  </p>
                  <div className="flex flex-col md:flex-row gap-y-4 items-center gap-x-4 font-sans">
                    <div className="flex flex-row items-center gap-x-1.5">
                      <IoPeopleOutline
                        color="#7f7f7f"
                        className="text-[1.04rem]"
                      />
                      <p className="text-[#f4f4f4] font-medium text-xs flex gap-x-1">
                        <span>{projectDetail?.total_followers}</span>
                        <span className="text-[#7f7f7f] font-normal">
                          Followers
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                      <HiOutlineCube color="#7f7f7f" className="text-xl" />
                      <p className="text-[#f4f4f4] font-medium text-xs flex flex-row gap-x-1">
                        <span className="text-[#BCBCBC] font-normal w-full flex ">
                          {projectChains?.map((c: any) => (
                            <React.Fragment key={c}>{`${c} . `}</React.Fragment>
                          ))}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                      <RxDashboard color="#7f7f7f" className="text-[1.04rem]" />
                      <p className="text-[#f4f4f4] font-medium text-xs flex gap-x-1">
                        <span className="text-[#BCBCBC] font-normal w-full flex ">
                          {projectNiche?.map((c: any) => (
                            <React.Fragment key={c}>{`${c} . `}</React.Fragment>
                          ))}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-5">
              <NewPost projectDetail={projectDetail} />

              <EditProject projectDetail={projectDetail} />
            </div>
          </div>
          <Tabs
            defaultValue={activeTab}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full flex flex-row gap-x-5">
              <TabsList className="bg-transparent border-b border-b-[#303030] py-0 h-fit rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
                <TabsTrigger
                  value="feed-post"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="draft-post"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Drafts
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="hiring"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Hiring
                </TabsTrigger>
                <TabsTrigger
                  value="bounties"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Bounties
                </TabsTrigger>
                <TabsTrigger
                  value="announcements"
                  className="text-xs! text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:border-b-[1.5px]! data-[state=active]:border-b-white"
                >
                  Alphas
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent className="relative w-full h-full" value="feed-post">
              <div className="w-full h-full">
                {postLoading && privatePosts.length === 0
                  ? [...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-full h-[200px] my-4" />
                    ))
                  : privatePosts.map((post, index) => {
                      console.log(post);
                      return (
                        <div
                          key={post.uuid}
                          ref={
                            index === privatePosts.length - 1 ? ref : undefined
                          }
                        >
                          <MemoizedFeedsCard
                            post={post}
                            isPrivate
                            project={projectDetail}
                          />
                        </div>
                      );
                    })}

                {postLoading && privatePosts.length > 0 && (
                  <Skeleton className="w-full h-[200px] my-4" />
                )}
              </div>
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="events">
              <div className="w-full h-full grid grid-cols-1 gap-y-5">
                {eventLoading && events?.length === 0
                  ? [...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-full h-[200px] my-4" />
                    ))
                  : events?.map((event, index) => (
                      <div
                        key={event.uuid}
                        ref={index === events.length - 1 ? ref : undefined}
                      >
                        <MemoizedEventCard
                          event={event}
                          isPrivate
                          project={projectDetail}
                        />
                      </div>
                    ))}
                {eventLoading && events && events.length > 0 && (
                  <Skeleton className="w-full h-[200px] my-4" />
                )}
              </div>
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="hiring">
              <div className="w-full h-full grid grid-cols-1 gap-y-5">
                {hiringLoading && hiringPosts.length === 0
                  ? [...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-full h-[200px] my-4" />
                    ))
                  : hiringPosts.map((post, index) => {
                      console.log(hiringPosts);
                      return (
                        <div
                          key={post.uuid}
                          ref={
                            index === hiringPosts.length - 1 ? ref : undefined
                          }
                        >
                          <MemoizedHiringCard
                            post={post}
                            isPrivate
                            project_uuid={projectDetail.uuid}
                          />
                        </div>
                      );
                    })}
                {hiringLoading && hiringPosts.length > 0 && (
                  <Skeleton className="w-full h-[200px] my-4" />
                )}
              </div>
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="bounties">
              <div className="w-full h-full grid grid-cols-1 gap-y-5">
                {bountyLoading && bountyData?.length === 0
                  ? [...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-full h-[200px] my-4" />
                    ))
                  : bountyData?.map((bounty, index) => (
                      <div
                        key={bounty.uuid}
                        ref={index === bountyData?.length - 1 ? ref : undefined}
                      >
                        <MemoizedBountyCard
                          bounty={bounty}
                          isPrivate
                          project={projectDetail}
                        />
                      </div>
                    ))}
                {bountyLoading && bountyData && bountyData?.length > 0 && (
                  <Skeleton className="w-full h-[200px] my-4" />
                )}
              </div>
            </TabsContent>
            <TabsContent
              className="relative w-full h-full"
              value="announcements"
            >
              {/* <Feedscard pioneer={true} /> */}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 h-4 lg:hidden "></div>

        <div
          className="lg:w-3/12 w-0 lg:fixed top-[90px] right-3 h-[84vh] overflow-y-scroll border border-[#303030] bg-[#161616] hidden lg:flex flex-col gap-5 rounded-2xl p-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col gap-y-3.5">
            <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-medium">
              Trazen Announcements
            </h5>
            <Card className="py-3! px-4! rounded-[12px]! flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Card className="py-3! px-4! rounded-[12px]! flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <div className="flex gap-2">
                <Image src={announcementImage} alt="news" />
                <Image src={announcementImage} alt="news" />
              </div>
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Card className="py-3! px-4! rounded-[12px]! flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Button
              onClick={() => router.replace("https://blog.trazen.xyz")}
              className="py-3! px-4! rounded-[12px]! flex justify-between items-center font-sans text-[#F4F4F4F4] text-sm font-normal border border-[#303030]"
            >
              <p className="text-[#B9B9B9] text-xs ">See More</p>
              <ArrowRight weight="Outline" size={20} color="#F4F4F4F4" />
            </Button>
          </div>
          <div className="flex flex-col gap-3.5">
            <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-medium">
              Other Projects
            </h5>
            <ul className="flex flex-col gap-3.5">
              {otherProjects.length > 0 ? (
                otherProjects.map((project: ProjectDetail) => (
                  <ProjectCard
                    className="w-full h-max! md:py-2.5! md:px-4! block! mt-0!"
                    key={project.uuid}
                  >
                    <button
                      onClick={() => router.push(`/dashboard/${project.uuid}`)}
                      className="w-full flex items-center gap-5 justify-between hover:cursor-pointer"
                    >
                      <div className="w-full flex gap-4 justify-between">
                        <Avatar className="w-7 h-7 rounded-full">
                          <AvatarImage src={project.avatar} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-[#f4f4f4]">
                          {project.name}
                        </span>
                        <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
                      </div>
                    </button>
                  </ProjectCard>
                ))
              ) : (
                <p className="text-center text-[#9f9f9f] text-sm py-3">
                  No other projects available
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
