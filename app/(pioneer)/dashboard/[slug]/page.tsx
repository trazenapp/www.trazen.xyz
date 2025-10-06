"use client";
import React, { useState, useRef, useMemo, use, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feedscard from "@/components/feedsCard";
import { FaArrowLeft, FaImage, FaSquareXTwitter } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCube } from "react-icons/hi";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Card from "@/components/card";
import announcementImage from "@/public/announcement-image.svg";
import { ArrowRight } from "@solar-icons/react";
import { PlusIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import ProjectCard from "@/components/projectCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chainOptions, nicheOptions } from "@/constants/options";
import FormRadio from "@/components/form/formRadio";
import { FaCheck } from "react-icons/fa6";
import { LuFilePenLine } from "react-icons/lu";
import { Pen } from "lucide-react";
import { FeedPostsMain } from "@/components/feedPost";
// import { FeedPostsFooter } from "@/components/feedPost";
import EventsPost from "@/components/eventsPost";
import HiringPost from "@/components/hiringPost";
import BountyPost from "@/components/bountyPost";
import { setShow } from "@/redux/slices/dashboardSidebarSlice";
import Drafts from "@/components/drafts";
import { useLocalStorageState } from "@/components/localStorage";
import { Descendant, Node } from "slate";
import { Element as SlateElement } from "slate";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { set } from "date-fns";
import { withLists } from "@/lib/withLists";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPublicPosts, fetchPrivatePosts } from "@/redux/slices/postSlice";
import {
  getProject,
  setLoading,
  getProjectDetail,
} from "@/redux/slices/projectSlice";
import { FormType } from "@/types/post.types";
import { toast } from "react-toastify";

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
  const { privatePosts, loading, pagination, hasMore } =
    useAppSelector((state) => state.post);

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
  const [formType, setFormType] = useState<FormType>("feed");

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
              <div className="w-1/2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full font-sans bg-white hover:bg-black hover:text-white text-black rounded-full py-3 mb-4 max-sm:text-[13px] max-sm:font-semibold">
                      <PlusIcon />
                      <span>New Post</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className=" font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:!max-w-[95vw]  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <DialogHeader className="py-4 sm:px-7 p-4 border-b-[1px] border-b-[#383838] !h-auto">
                      <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4] ">
                        <p className="max-sm:text-[16px]">New post</p>
                        <Button
                          className="bg-transparent px-6 py-3 rounded-full hover:bg-transparent gap-2 border border-[#303030] mr-5"
                          // onClick={handleSaveDrafts}
                        >
                          <LuFilePenLine style={{ color: "#a6a6a6" }} />
                          <p className="text-[#a6a6a6] sm:text-[14px] text-[12px]">
                            Drafts
                          </p>
                        </Button>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:gap-2 gap-3 py-2 sm:px-7 px-3">
                      <Select
                        value={formType}
                        onValueChange={(val: FormType) => {
                          setFormType(val as FormType);
                        }}
                      >
                        <SelectTrigger className="font-sans w-max py-5 px-4 border-[#434343] text-[#f4f4f4] rounded-full max-sm:text-[14px] ">
                          <SelectValue placeholder={formType} />
                        </SelectTrigger>
                        <SelectContent className="font-sans bg-[#161616] border-[#303030] rounded-2xl">
                          <SelectGroup className="w-[200px]">
                            <SelectLabel className="text-[#f4f4f4] sm:text-[16px] text-[13px] ">
                              Chooose post type
                            </SelectLabel>
                            <SelectItem
                              className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                              value="feed"
                            >
                              Feeds
                            </SelectItem>
                            <SelectItem
                              className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                              value="events"
                            >
                              Events
                            </SelectItem>
                            <SelectItem
                              className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                              value="hiring"
                            >
                              Hiring
                            </SelectItem>
                            <SelectItem
                              className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff]"
                              value="bounties"
                            >
                              Bounties
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {formType === "feed" && (
                        <FeedPostsMain projectId={projectDetail?.uuid} />
                      )}
                      {formType === "events" && (
                        <>
                          <EventsPost projectId={projectDetail?.uuid} />
                        </>
                      )}
                      {formType === "hiring" && (
                        <></>
                        // <HiringPost
                        //   jobTitle={jobTitle}
                        //   setJobTitle={setJobTitle}
                        //   jobType={jobType}
                        //   setJobType={setJobType}
                        //   jobExperienceLevel={jobExperienceLevel}
                        //   setJobExperienceLevel={setJobExperienceLevel}
                        //   jobLocation={jobLocation}
                        //   setJobLocation={setJobLocation}
                        //   jobConvenience={jobConvenience}
                        //   setJobConvenience={setJobConvenience}
                        //   jobPayment={jobPayment}
                        //   setJobPayment={setJobPayment}
                        //   jobApplicationLink={jobApplicationLink}
                        //   setJobApplicationLink={setJobApplicationLink}
                        //   description={jobDescription}
                        //   setDescription={setJobDescription}
                        //   editor={editor}
                        // />
                      )}
                      {formType === "bounties" && (
                        <></>
                        // <BountyPost
                        //   bountyTitle={bountyTitle}
                        //   setBountyTitle={setBountyTitle}
                        //   bountyDuration={bountyDuration}
                        //   setBountyDuration={setBountyDuration}
                        //   bountyReward={bountyReward}
                        //   setBountyReward={setBountyReward}
                        //   bountyLink={bountyLink}
                        //   setBountyLink={setBountyLink}
                        // />
                      )}
                      {/* {showDrafts && draftItems.length < 1 && (
                        <Drafts>
                          <div className="flex flex-col items-center gap-3 min-h-[50vh] justify-center pb-4">
                            <LuFilePenLine
                              className="text-[#a6a6a6]"
                              size={95}
                              strokeWidth={1}
                            />
                            <p className="text-[#dddddd] sm:text-xl text-lg ">
                              Your drafts is empty
                            </p>
                            <p className="text-[#7f7f7f] sm:text-sm text-[12px] ">
                              Your drafts will appear here
                            </p>
                          </div>
                        </Drafts>
                      )} */}
                      {/* {showDrafts && draftItems.length > 0 && (
                          <Drafts>
                            <div className="flex flex-col gap-3 min-h-[50vh] pb-4">
                              {draftItems.map((draft) => (
                                <div className="pb-2 border-b-1 border-b-[#303030]">
                                  <div className="flex w-max gap-7 justify-end ml-auto mb-2">
                                    <Button
                                      className="bg-transparent !p-0 hover:bg-transparent ml-auto"
                                      onClick={() => {
                                        handleEditDraft(draft);
                                      }}
                                    >
                                      <p className="text-[#a6a6a6] text-xs">
                                        Edit
                                      </p>
                                      <Pen
                                        style={{
                                          width: 13,
                                          height: 13,
                                          color: "#a6a6a6",
                                        }}
                                      />
                                    </Button>
                                    <Button
                                      className="bg-transparent !p-0 hover:bg-transparent ml-auto"
                                      onClick={() =>
                                        handleDeleteDraft(draft.id)
                                      }
                                    >
                                      <p className="text-[#ff5151] text-xs">
                                        Delete draft
                                      </p>
                                      <Trash2
                                        style={{
                                          width: 13,
                                          height: 13,
                                          color: "#ff5151",
                                        }}
                                      />
                                    </Button>
                                  </div>
                                  {draft.data.text && (
                                    <p className="mb-1.5">
                                      Feed post: {draft.data.text}
                                    </p>
                                  )}{" "}
                                  {draft.data.image && (
                                    <div className="h-max grid grid-cols-2 gap-2 mb-1.5">
                                      Images:
                                      {draft.data.image.map((img: string, index: number) => (
                                        <div className="w-full h-[170px]">
                                          <img
                                            src={img}
                                            alt={`preview-${index}`}
                                            className="w-full h-full object-cover rounded-lg"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {draft.data.eventDescription && (
                                    <div>
                                      Event description:
                                      <div
                                        className="mb-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                                        dangerouslySetInnerHTML={{
                                          __html: draft.data.eventDescription
                                            .map((n: Descendant) => serialize(n))
                                            .join(""),
                                        }}
                                      />
                                    </div>
                                  )}
                                  {draft.data.date && (
                                    <p className="mb-1.5">
                                      Event date: {draft.data.date}
                                    </p>
                                  )}
                                  {draft.data.time && (
                                    <p className="mb-1.5">
                                      Event time: {draft.data.time}
                                    </p>
                                  )}
                                  {draft.data.location && (
                                    <p className="mb-1.5">
                                      Event location: {draft.data.location}
                                    </p>
                                  )}
                                  {draft.data.eventType && (
                                    <p className="mb-1.5">
                                      Event type: {draft.type}
                                    </p>
                                  )}
                                  {draft.data.jobTitle && (
                                    <p className="mb-1.5">
                                      Job title: {draft.data.jobTitle}
                                    </p>
                                  )}
                                  {draft.data.jobDescription && (
                                    <div>
                                      Job description:
                                      <div
                                        className="mb-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                                        dangerouslySetInnerHTML={{
                                          __html: draft.data.jobDescription
                                            .map((n: Descendant) => serialize(n))
                                            .join(""),
                                        }}
                                      />
                                    </div>
                                  )}
                                  {draft.data.jobType && (
                                    <p className="mb-1.5">
                                      Job type: {draft.data.jobType}
                                    </p>
                                  )}
                                  {draft.data.jobExperienceLevel && (
                                    <p className="mb-1.5">
                                      Job experience level
                                      {draft.data.jobExperienceLevel}
                                    </p>
                                  )}
                                  {draft.data.jobLocation && (
                                    <p className="mb-1.5">
                                      Job location: {draft.data.jobLocation}
                                    </p>
                                  )}
                                  {draft.data.jobConvenience && (
                                    <p className="mb-1.5">
                                      Job convenience
                                      {draft.data.jobConvenience}
                                    </p>
                                  )}
                                  {draft.data.jobPayment && (
                                    <p className="mb-1.5">
                                      Job payment: {draft.data.jobPayment}
                                    </p>
                                  )}
                                  {draft.data.jobApplicationLink && (
                                    <p className="mb-1.5">
                                      Job application link:
                                      {draft.data.jobApplicationLink}
                                    </p>
                                  )}
                                  {draft.data.bountyTitle && (
                                    <p className="mb-1.5">
                                      Bounty title: {draft.data.bountyTitle}
                                    </p>
                                  )}
                                  {draft.data.bountyDuration && (
                                    <p className="mb-1.5">
                                      Bounty duration:
                                      {draft.data.bountyDuration}
                                    </p>
                                  )}
                                  {draft.data.bountyReward && (
                                    <p className="mb-1.5">
                                      Bounty reward: {draft.data.bountyReward}
                                    </p>
                                  )}
                                  {draft.data.bountyLink && (
                                    <p className="mb-1.5">
                                      Bounty link: {draft.data.bountyLink}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Drafts>
                        )} */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="w-1/2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full font-sans bg-black hover:bg-white hover:text-black text-white rounded-full py-3 mb-4 max-sm:text-[13px] max-sm:font-semibold">
                      Edit Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className=" font-sans bg-[#161616] border-[#303030] rounded-2xl py-8 px-7 sm:max-w-[425px] lg:!max-w-[480px] !max-h-[90vh] max-sm:!max-h-[95vh] overflow-y-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <DialogHeader>
                      <DialogTitle className="font-medium text-2xl">
                        Edit Project
                      </DialogTitle>
                      <DialogDescription className="text-xs text-[#dddddd] font-light">
                        Enter the details of the project in the form below
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label
                          htmlFor="project_name-1"
                          className="text-sm text-[#f4f4f4] font-light "
                        >
                          Project Name
                        </Label>
                        <Input
                          id="project_name-1"
                          name="name"
                          defaultValue=""
                          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#430b68] focus-visible:!ring-[0]"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="username-1"
                          className="text-sm text-[#f4f4f4] font-light "
                        >
                          Username
                        </Label>
                        <Textarea
                          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-25 focus-visible:!border-[#430b68] focus-visible:!ring-[0] resize-none"
                          defaultValue=""
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="social-url"
                          className="text-sm text-[#f4f4f4] font-light "
                        >
                          Social url (X)
                        </Label>
                        <Input
                          id="social-url"
                          name="name"
                          defaultValue=""
                          className="border-[#434343] !text-xs text-[#f4f4f4] font-light h-11 focus-visible:!border-[#430b68] focus-visible:!ring-[0]"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label className="text-sm text-[#f4f4f4] font-light ">
                          Does this project have a team?
                        </Label>
                        <Select>
                          <SelectTrigger className="font-sans w-full py-5.5 border-[#434343] ">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="font-sans bg-[#161616] border-[#434343]">
                            <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem
                                className="text-[#bcbcbc] focus:bg-[#303030] focus:text-[#fff] "
                                value="yes"
                              >
                                Yes
                              </SelectItem>
                              <SelectItem
                                className="text-[#bcbcbc] focus:bg-[#303030] focus:text-[#fff]"
                                value="no"
                              >
                                No
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-[#F4F4F4F4] text-sm font-normal text-left">
                        Chains
                      </p>
                      <div>
                        <FormRadio
                          options={chainOptions}
                          value=""
                          onChange={() => {}}
                          selectedIcon={<FaCheck />}
                        />
                      </div>
                      <p className="text-[#F4F4F4F4] text-sm font-normal text-left mt-5">
                        Niche
                      </p>
                      <div>
                        <FormRadio
                          options={nicheOptions}
                          value=""
                          onChange={() => {}}
                          selectedIcon={<FaCheck />}
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-3 !justify-start">
                      <Button
                        className="bg-[#430b68] rounded-full "
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
            <Skeleton key={post.uuid} className="w-full h-[200px] my-4" />
          ))
        : privatePosts.map((post) => (
              <Feedscard
                key={post.uuid}
                uuid={post.uuid as string}
                content={post.content}
                medias={post.medias}
                createdAt={post.created_at}
                voteCount={post.voteCount}
                commentCount={post.commentCount}
                name={post.project?.name}
                avatar={post.project?.avatar}
                is_approved={post.project?.is_approved}
                project_uuid={post.project_uuid}
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
