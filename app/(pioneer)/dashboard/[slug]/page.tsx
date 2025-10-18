"use client";
import React, {
  useRef,
  use,
  useEffect,
  useCallback,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feedscard from "@/components/feedsCard";
import { FaArrowLeft, FaSquareXTwitter } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { HiOutlineCube } from "react-icons/hi";
import Image from "next/image";
import Card from "@/components/card";
import announcementImage from "@/public/announcement-image.svg";
import { ArrowRight } from "@solar-icons/react";
import { ChevronRightIcon } from "lucide-react";
import ProjectCard from "@/components/projectCard";
import NewPost from "@/components/newPost";
import EditProject from "@/components/editProject";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPublicPosts, fetchPrivatePosts } from "@/redux/slices/postSlice";
import {
  getProject,
  setLoading,
  getProjectDetail,
} from "@/redux/slices/projectSlice";

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

type FormValues = {
  content: string;
  is_published: boolean;
};

const Profile = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const { privatePosts, loading, pagination, hasMore } = useAppSelector(
    (state) => state.post
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            fetchPublicPosts({
              search: "",
              page: pagination.page + 1,
              limit: pagination.limit,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pagination.page, pagination.limit, dispatch]
  );

  useEffect(() => {
    dispatch(fetchPrivatePosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(getProjectDetail(slug)).unwrap();
        dispatch(setLoading(false));
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);

  if (!projectDetail) {
    return null;
  }

  return (
    <>
      <div className="xl:w-[50%] lg:w-[50%] lg:flex filter xl:-ml-16 lg:-ml-11">
        <div className="md:w-full max-lg:px-4">
          <div className="w-full flex items-center gap-x-6 font-sans mb-4">
            <Button onClick={router.back} className="border-0 bg-transparent">
              <FaArrowLeft />
            </Button>
            <div className="flex gap-x-2.5">
              <p className="text-[#f4f4f4] text-xl font-medium flex items-center gap-x-2">
                Project Details
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-x-5">
              <Avatar className="lg:w-[120px] lg:h-[120px] sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] ">
                <AvatarImage src={projectDetail?.avatar} className="" />
                <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 font-sans">
                <p className="text-[#f4f4f4] sm:text-[28px] text-[20px] font-medium flex items-center gap-x-2 mb-4">
                  {projectDetail?.name}{" "}
                  {projectDetail?.is_approved && (
                    <BsPatchCheckFill size={24} color="#B348F9" />
                  )}
                </p>
                <p className="sm:text-base text-[12px] font-normal text-[#BCBCBC]">
                  {projectDetail?.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-y-4 items-center gap-x-4 font-sans">
              {/* <div className="flex flex-row items-center gap-x-1.5">
                <IoPeopleOutline color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span>19.3K</span>
                  <span className="text-[#7f7f7f] font-normal">Followers</span>
                </p>
              </div> */}
              <div className="flex flex-row items-center gap-x-1.5">
                <FaSquareXTwitter color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <Link
                    href={projectDetail?.social as string}
                    target="blank"
                    className="text-[#1768FF] font-normal"
                  >
                    {projectDetail?.social}
                  </Link>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-1.5">
                <HiOutlineCube color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">
                    {projectDetail?.categories?.map((c: any) => (
                      <React.Fragment key={c}>{`${c} . `}</React.Fragment>
                    ))}
                  </span>
                </p>
              </div>
              {/* <div className="flex flex-row items-center gap-x-1.5">
                <RxDashboard color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">NFTs</span>
                </p>
              </div> */}
            </div>
            <div className="w-full flex gap-5">
              <NewPost projectDetail={projectDetail} />

              <EditProject projectDetail={projectDetail} />
            </div>
          </div>
          <Tabs
            defaultValue="feed-post"
            className="w-full flex flex-col items-center"
          >
            <div className="w-full flex flex-row gap-x-5">
              <TabsList className="bg-transparent border-b border-b-[#303030] py-0 h-fit rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
                <TabsTrigger
                  value="feed-post"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white max-sm:!text-[2.5vw]"
                >
                  Feed Post
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white max-sm:!text-[2.5vw]"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="hiring"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white max-sm:!text-[2.5vw]"
                >
                  Hiring
                </TabsTrigger>
                <TabsTrigger
                  value="bounties"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white max-sm:!text-[2.5vw]"
                >
                  Bounties
                </TabsTrigger>
                <TabsTrigger
                  value="announcements"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white max-sm:!text-[2.5vw]"
                >
                  Announcements
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent className="relative w-full h-full" value="feed-post">
              <div className="w-full h-full">
                {loading
                  ? privatePosts.map((post) => (
                      <Skeleton
                        key={post.uuid}
                        className="w-full h-[200px] my-4"
                      />
                    ))
                  : privatePosts.map((post) => (
                      <Feedscard post={post}
                      />
                    ))}
              </div>
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="events">
              {/* <Feedscard pioneer={true} /> */}
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="hiring">
              {/* <Feedscard pioneer={true} /> */}
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="bounties">
              {/* <Feedscard pioneer={true} /> */}
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
            <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <div className="flex gap-2">
                <Image src={announcementImage} alt="news" />
                <Image src={announcementImage} alt="news" />
              </div>
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Card className="!py-3 !px-4 !rounded-[12px] flex flex-col gap-y-2 font-sans text-[#F4F4F4F4] text-sm font-normal">
              <p className="text-[#B9B9B9] text-xs ">
                Bitcoin & equities move in tandem again and the CEO of Trazen is
                getting married
              </p>
            </Card>
            <Button className="!py-3 !px-4 !rounded-[12px] flex justify-between items-center font-sans text-[#F4F4F4F4] text-sm font-normal border border-[#303030]">
              <p className="text-[#B9B9B9] text-xs ">See More</p>
              <ArrowRight weight="Outline" size={20} color="#F4F4F4F4" />
            </Button>
          </div>
          <div className="flex flex-col gap-3.5">
            <h5 className=" font-sans text-[#F4F4F4F4] text-sm font-medium">
              Other Projects
            </h5>
            <ul className="flex flex-col gap-3.5">
              {tempProjectsList.map((project) => (
                <ProjectCard
                  className="w-full !h-max md:!py-2.5 md:!px-4 !block !mt-0"
                  key={project.name}
                >
                  <div className="w-full flex gap-4 justify-between">
                    <Avatar className="w-7 h-max rounded-full">
                      <AvatarImage src={project.logo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <button className="w-full flex items-center gap-5 justify-between hover:cursor-pointer">
                      <span className="text-sm text-[#f4f4f4]">
                        {project.name}
                      </span>
                      <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
                    </button>
                  </div>
                </ProjectCard>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
