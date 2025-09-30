"use client";
import React, { useState, useRef, useMemo, use, useEffect } from "react";
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
import { FeedPostsFooter } from "@/components/feedPost";
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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProject, setLoading } from "@/redux/slices/projectSlice";
import { useForm, Controller } from "react-hook-form";
import { createPost } from "@/redux/slices/postSlice";
import { CreatePost } from "@/types/post.types";
import { toast } from "react-toastify";

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

type Props = {
  projectUuid: string;
  defaultPublished?: boolean;
};

type FormValues = {
  content: string;
  is_published: boolean;
};

const Profile = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state: RootState) => state.project);
  const { loading, error, lastCreated } = useAppSelector(
    (state: RootState) => state.post
  );

  const { handleSubmit, control, reset, setValue, watch } = useForm<FormValues>(
    {
      defaultValues: { content: "", is_published: false },
    }
  );

  const allProjects = projects?.projects as [];
  const projectItem = allProjects?.find((item: any) => item.name === slug);
  console.log(projectItem);

  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(getProject()).unwrap();
        dispatch(setLoading(false));
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);

  type DraftItem = {
    id: string;
    text?: string;
    image?: string[];
    eventDescription?: Descendant[];
    date?: string;
    time?: string;
    location?: string;
    eventType?: string;
    jobTitle?: string;
    jobType?: string;
    jobExperienceLevel?: string;
    jobConvenience?: string;
    jobLocation?: string;
    jobPayment?: string;
    jobApplicationLink?: string;
    jobDescription?: Descendant[];
    bountyTitle?: string;
    bountyDuration?: string;
    bountyReward?: string;
    bountyLink?: string;
  };

  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [eventDescription, setEventDescription] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobExperienceLevel, setJobExperienceLevel] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobConvenience, setJobConvenience] = useState<string>("");
  const [jobPayment, setJobPayment] = useState<string>("");
  const [jobApplicationLink, setJobApplicationLink] = useState<string>("");
  const [bountyTitle, setBountyTitle] = useState<string>("");
  const [bountyDuration, setBountyDuration] = useState<string>("");
  const [bountyReward, setBountyReward] = useState<string>("");
  const [bountyLink, setBountyLink] = useState<string>("");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [draftItems, setDraftItems] = useLocalStorageState<DraftItem[]>(
    [],
    "drafts"
  );
  const [postType, setPostType] = useState("feed-post");
  const [showDrafts, setShowDrafts] = useState(false);

  const editor = useMemo(
    () => withLists(withHistory(withReact(createEditor()))),
    []
  );

  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // const plainText = eventDescription.map((n) => Node.string(n)).join("\n");

  function handleSelectEmoji(emoji: string) {
    const el = inputRef.current;
    if (!el) {
      setText((prev) => prev + emoji);
      return;
    }
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;

    const next = text.slice(0, start) + emoji + text.slice(end);
    setText(next);

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function handleDeleteDraft(id: string) {
    setDraftItems((drafts) => drafts.filter((draft) => draft.id !== id));
  }

  function handleSaveDrafts() {
    if (postType === "feed-post") {
      const newDraft =
        images.length > 0 && text
          ? { id: crypto.randomUUID(), postType, text, image: images }
          : images.length > 0
            ? { id: crypto.randomUUID(), postType, image: images }
            : { id: crypto.randomUUID(), postType, text };

      if (!newDraft.text && !newDraft.image) return;

      setDraftItems((drafts) => [...drafts, newDraft]);
      localStorage.setItem("drafts", JSON.stringify([...draftItems, newDraft]));

      setText("");
      setImages([]);

      setSavedMsg("Draft saved");
      setTimeout(() => setSavedMsg(null), 3000);
    }

    if (postType === "events") {
      const eventDescriptionValidity = eventDescription.at(0);

      if (
        !eventDescriptionValidity ||
        !SlateElement.isElement(eventDescriptionValidity)
      ) {
        return;
      }

      const hasText = Boolean(eventDescriptionValidity.children[0]?.text);
      const hasOrderedList = Boolean(eventDescriptionValidity.type === "ol");
      const hasUnorderedList = Boolean(eventDescriptionValidity.type === "ul");
      const draft: any = {
        id: crypto.randomUUID(),
        postType,
      };

      if (hasText || hasOrderedList || hasUnorderedList)
        draft.eventDescription = eventDescription;
      if (date) draft.date = date;
      if (time) draft.time = time;
      if (location) draft.location = location;
      if (eventType) draft.eventType = eventType;

      if (
        !hasText &&
        !hasOrderedList &&
        !hasUnorderedList &&
        !date &&
        !time &&
        !location &&
        !eventType
      ) {
        return;
      }

      setDraftItems((drafts) => [...drafts, draft]);

      localStorage.setItem("drafts", JSON.stringify([...draftItems, draft]));

      setSavedMsg("Draft saved");
      setTimeout(() => setSavedMsg(null), 3000);
    }

    if (postType === "hiring") {
      const jobDescriptionValidity = jobDescription.at(0);

      if (
        !jobDescriptionValidity ||
        !SlateElement.isElement(jobDescriptionValidity)
      ) {
        return;
      }

      const hasText = Boolean(jobDescriptionValidity.children[0]?.text);
      const hasOrderedList = Boolean(jobDescriptionValidity.type === "ol");
      const hasUnorderedList = Boolean(jobDescriptionValidity.type === "ul");
      const draft: any = {
        id: crypto.randomUUID(),
        postType,
      };

      if (hasText || hasOrderedList || hasUnorderedList)
        draft.jobDescription = jobDescription;
      if (jobTitle) draft.jobTitle = jobTitle;
      if (jobType) draft.jobType = jobType;
      if (jobExperienceLevel) draft.jobExperienceLevel = jobExperienceLevel;
      if (jobLocation) draft.jobLocation = jobLocation;
      if (jobConvenience) draft.jobConvenience = jobConvenience;
      if (jobPayment) draft.jobPayment = jobPayment;
      if (jobApplicationLink) draft.jobApplicationLink = jobApplicationLink;

      if (
        !hasText &&
        !hasOrderedList &&
        !hasUnorderedList &&
        !jobTitle &&
        !jobType &&
        !jobExperienceLevel &&
        !jobLocation &&
        !jobConvenience &&
        !jobPayment &&
        !jobApplicationLink
      ) {
        return;
      }

      setDraftItems((drafts) => [...drafts, draft]);

      localStorage.setItem("drafts", JSON.stringify([...draftItems, draft]));

      setSavedMsg("Draft saved");
      setTimeout(() => setSavedMsg(null), 3000);
    }

    if (postType === "bounties") {
      const draft: any = {
        id: crypto.randomUUID(),
        postType,
      };

      if (bountyTitle) draft.bountyTitle = bountyTitle;
      if (bountyDuration) draft.bountyDuration = bountyDuration;
      if (bountyReward) draft.bountyReward = bountyReward;
      if (bountyLink) draft.bountyLink = bountyLink;

      if (!bountyTitle && !bountyDuration && !bountyReward && !bountyLink) {
        return;
      }

      setDraftItems((drafts) => [...drafts, draft]);

      localStorage.setItem("drafts", JSON.stringify([...draftItems, draft]));

      setSavedMsg("Draft saved");
      setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  function serialize(node: Descendant): string {
    if ("text" in node) {
      let text = node.text;
      if ((node as any).bold) text = `<strong>${text}</strong>`;
      if ((node as any).italic) text = `<em>${text}</em>`;
      if ((node as any).underline) text = `<u>${text}</u>`;
      return text;
    }

    const children = node.children.map((n) => serialize(n)).join("");

    switch ((node as any).type) {
      case "paragraph":
        return `<p class="mb-1">${children}</p>`;
      case "ol":
        return `<ol class="mb-1 list-decimal pl-6">${children}</ol>`;
      case "ul":
        return `<ul class="mb-1 list-disc pl-6">${children}</ul>`;
      case "li":
        return `<li key=${crypto.randomUUID()} >${children}</li>`;
      default:
        return children;
    }
  }

  function handleEditDraft(draft: any) {
    setPostType(draft.postType);
    draft.text && setText(draft.text);
    draft.image && setImages(draft.image);
    draft.eventDescription && setEventDescription(draft.eventDescription);
    draft.date && setDate(draft.date);
    draft.time && setTime(draft.time);
    draft.location && setLocation(draft.location);
    draft.eventType && setEventType(draft.eventType);
    draft.jobDescription && setJobDescription(draft.jobDescription);
    draft.jobTitle && setJobTitle(draft.jobTitle);
    draft.jobType && setJobType(draft.jobType);
    draft.jobExperienceLevel && setJobExperienceLevel(draft.jobExperienceLevel);
    draft.jobLocation && setJobLocation(draft.jobLocation);
    draft.jobConvenience && setJobConvenience(draft.jobConvenience);
    draft.jobPayment && setJobPayment(draft.jobPayment);
    draft.jobApplicationLink && setJobApplicationLink(draft.jobApplicationL);
    draft.bountyTitle && setBountyTitle(draft.bountyTitle);
    draft.bountyDuration && setBountyDuration(draft.bountyDuration);
    draft.bountyReward && setBountyReward(draft.bountyReward);
    draft.bountyLink && setBountyLink(draft.bountyLink);
    setShowDrafts(false);
  }

  // const [images, setImages] = useState<string[]>([]); // base64 data URLs
  // const [draftItems, setDraftItems] = useState<
  //   { id: string; text?: string; image?: string[] }[]
  // >([]);
  // const [savedMsg, setSavedMsg] = useState<string | null>(null);

  // watch content for live binding if needed
  const contentValue = watch("content");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (lastCreated) {
      toast.success("Post created successfully");
      reset({ content: "", is_published: false });
      setImages([]);
    }
  }, [lastCreated, reset]);

  function handleEmojiSelect(emoji: string) {
    // append emoji to content
    setValue("content", `${contentValue || ""}${emoji}`);
  }

  async function onSubmit(data: FormValues) {
    // Prepare request payload
    const payload = {
      project_uuid: projectItem?.uuid as string,
      content: data.content,
      // API expects medias: array of strings — send base64 images or URLs.
      medias: images,
      is_published: data.is_published,
    };

    console.log(payload)

    try {
      await dispatch(createPost(payload)).unwrap();
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Failed to create post");
    }
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
                <AvatarImage src={projectItem?.avatar} className="" />
                <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 font-sans">
                <p className="text-[#f4f4f4] sm:text-[28px] text-[20px] font-medium flex items-center gap-x-2 mb-4">
                  {projectItem?.name}{" "}
                  {projectItem?.is_approved && (
                    <BsPatchCheckFill size={24} color="#B348F9" />
                  )}
                </p>
                <p className="sm:text-base text-[12px] font-normal text-[#BCBCBC]">
                  {projectItem?.description}
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
                    href={projectItem?.social as string}
                    target="blank"
                    className="text-[#1768FF] font-normal"
                  >
                    {projectItem?.social}
                  </Link>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-1.5">
                <HiOutlineCube color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">
                    {projectItem?.categories?.map((c) => (
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
                <Dialog
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      Transforms.deselect(editor);
                      setShowDrafts(false);
                      setPostType("feed-post");
                      setText("");
                      setImages([]);
                      setEventDescription([
                        { type: "paragraph", children: [{ text: "" }] },
                      ]);
                      setJobDescription([
                        { type: "paragraph", children: [{ text: "" }] },
                      ]);
                      setDate("");
                      setTime("");
                      setLocation("");
                      setEventType("");
                      setJobTitle("");
                      setJobType("");
                      setJobExperienceLevel("");
                      setJobConvenience("");
                      setJobLocation("");
                      setJobPayment("");
                      setJobApplicationLink("");
                      setBountyTitle("");
                      setBountyDuration("");
                      setBountyReward("");
                      setBountyLink("");
                    }
                  }}
                >
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
                    <DialogHeader className="py-4 sm:px-7 p-4 border-b-[1px] border-b-[#383838]">
                      <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4] ">
                        {showDrafts ? (
                          <div className="flex gap-5 items-center">
                            <Button
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => setShowDrafts(false)}
                            >
                              <FaArrowLeft />
                            </Button>
                            <p className="max-sm:text-[16px]"> Drafts</p>
                          </div>
                        ) : (
                          <p className="max-sm:text-[16px]">New post</p>
                        )}
                        {!showDrafts && (
                          <div className=" max-sm:mr-6 flex sm:gap-6 gap-3 sm:flex-row flex-col-reverse max-sm:items-end">
                            {savedMsg ? (
                              <div className=" flex gap-1 items-center font-sans text-[#21a80f] sm:text-[14px] text-[12px] font-bold animate-fade">
                                <FaCheck />
                                {savedMsg}
                              </div>
                            ) : (
                              <Button
                                className="bg-transparent !p-0 hover:bg-transparent max-sm:gap-1"
                                onClick={handleSaveDrafts}
                              >
                                <LuFilePenLine style={{ color: "#a6a6a6" }} />
                                <p className="text-[#a6a6a6] sm:text-[14px] text-[12px]">
                                  Save as draft
                                </p>
                              </Button>
                            )}
                            <Button
                              onClick={() => {
                                setShowDrafts(true);
                                setSavedMsg("");
                              }}
                              className="w-max sm:mr-9 rounded-full border-[#303030] border-[1px] py-1.5 sm:!px-5 max-sm:!px-4 max-sm:gap-1 font-light sm:text-[14px] text-[12px] text-[#f4f4f4]"
                            >
                              <LuFilePenLine className="text-[#f4f4f4] " />
                              <span>Drafts</span>
                            </Button>
                          </div>
                        )}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid sm:gap-2 gap-3 py-2 sm:px-7 px-3">
                        {!showDrafts && (
                          <Select
                            value={postType}
                            onValueChange={(val) => {
                              setShowDrafts(false);
                              setPostType(val);
                              setEventDescription([
                                { type: "paragraph", children: [{ text: "" }] },
                              ]);
                              setJobDescription([
                                { type: "paragraph", children: [{ text: "" }] },
                              ]);
                            }}
                          >
                            <SelectTrigger className="font-sans w-max py-5 px-4 border-[#434343] text-[#f4f4f4] rounded-full max-sm:text-[14px] ">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="font-sans bg-[#161616] border-[#303030] rounded-2xl">
                              <SelectGroup className="w-[200px]">
                                <SelectLabel className="text-[#f4f4f4] sm:text-[16px] text-[13px] ">
                                  Chooose post type
                                </SelectLabel>
                                <SelectItem
                                  className="text-[#bcbcbc] text-[12px] focus:bg-[#303030] focus:text-[#fff] "
                                  value="feed-post"
                                >
                                  Feed post
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
                        )}
                        {!showDrafts && postType === "feed-post" && (
                          <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                              <FeedPostsMain
                                ref={undefined as any} // FeedPostsMain expects forwarded ref — we aren't using it here
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          // <FeedPostsMain
                          //   ref={inputRef}
                          //   value={text}
                          //   onChange={setText}
                          // />
                        )}
                        {!showDrafts && postType === "events" && (
                          <>
                            <EventsPost
                              description={eventDescription}
                              setDescription={setEventDescription}
                              date={date}
                              setDate={setDate}
                              time={time}
                              setTime={setTime}
                              location={location}
                              setLocation={setLocation}
                              eventType={eventType}
                              setEventType={setEventType}
                              editor={editor}
                            />
                          </>
                        )}
                        {!showDrafts && postType === "hiring" && (
                          <HiringPost
                            jobTitle={jobTitle}
                            setJobTitle={setJobTitle}
                            jobType={jobType}
                            setJobType={setJobType}
                            jobExperienceLevel={jobExperienceLevel}
                            setJobExperienceLevel={setJobExperienceLevel}
                            jobLocation={jobLocation}
                            setJobLocation={setJobLocation}
                            jobConvenience={jobConvenience}
                            setJobConvenience={setJobConvenience}
                            jobPayment={jobPayment}
                            setJobPayment={setJobPayment}
                            jobApplicationLink={jobApplicationLink}
                            setJobApplicationLink={setJobApplicationLink}
                            description={jobDescription}
                            setDescription={setJobDescription}
                            editor={editor}
                          />
                        )}
                        {!showDrafts && postType === "bounties" && (
                          <BountyPost
                            bountyTitle={bountyTitle}
                            setBountyTitle={setBountyTitle}
                            bountyDuration={bountyDuration}
                            setBountyDuration={setBountyDuration}
                            bountyReward={bountyReward}
                            setBountyReward={setBountyReward}
                            bountyLink={bountyLink}
                            setBountyLink={setBountyLink}
                          />
                        )}
                        {showDrafts && draftItems.length < 1 && (
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
                        )}
                        {showDrafts && draftItems.length > 0 && (
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
                                  {draft.text && (
                                    <p className="mb-1.5">
                                      Feed post: {draft.text}
                                    </p>
                                  )}{" "}
                                  {draft.image && (
                                    <div className="h-max grid grid-cols-2 gap-2 mb-1.5">
                                      Images:
                                      {draft.image.map((img, index) => (
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
                                  {draft.eventDescription && (
                                    <div>
                                      Event description:
                                      <div
                                        className="mb-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                                        dangerouslySetInnerHTML={{
                                          __html: draft.eventDescription
                                            .map((n) => serialize(n))
                                            .join(""),
                                        }}
                                      />
                                    </div>
                                  )}
                                  {draft.date && (
                                    <p className="mb-1.5">
                                      Event date: {draft.date}
                                    </p>
                                  )}
                                  {draft.time && (
                                    <p className="mb-1.5">
                                      Event time: {draft.time}
                                    </p>
                                  )}
                                  {draft.location && (
                                    <p className="mb-1.5">
                                      Event location: {draft.location}
                                    </p>
                                  )}
                                  {draft.eventType && (
                                    <p className="mb-1.5">
                                      Event type: {draft.eventType}
                                    </p>
                                  )}
                                  {draft.jobTitle && (
                                    <p className="mb-1.5">
                                      Job title: {draft.jobTitle}
                                    </p>
                                  )}
                                  {draft.jobDescription && (
                                    <div>
                                      Job description:
                                      <div
                                        className="mb-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                                        dangerouslySetInnerHTML={{
                                          __html: draft.jobDescription
                                            .map((n) => serialize(n))
                                            .join(""),
                                        }}
                                      />
                                    </div>
                                  )}
                                  {draft.jobType && (
                                    <p className="mb-1.5">
                                      Job type: {draft.jobType}
                                    </p>
                                  )}
                                  {draft.jobExperienceLevel && (
                                    <p className="mb-1.5">
                                      Job experience level
                                      {draft.jobExperienceLevel}
                                    </p>
                                  )}
                                  {draft.jobLocation && (
                                    <p className="mb-1.5">
                                      Job location: {draft.jobLocation}
                                    </p>
                                  )}
                                  {draft.jobConvenience && (
                                    <p className="mb-1.5">
                                      Job convenience
                                      {draft.jobConvenience}
                                    </p>
                                  )}
                                  {draft.jobPayment && (
                                    <p className="mb-1.5">
                                      Job payment: {draft.jobPayment}
                                    </p>
                                  )}
                                  {draft.jobApplicationLink && (
                                    <p className="mb-1.5">
                                      Job application link:
                                      {draft.jobApplicationLink}
                                    </p>
                                  )}
                                  {draft.bountyTitle && (
                                    <p className="mb-1.5">
                                      Bounty title: {draft.bountyTitle}
                                    </p>
                                  )}
                                  {draft.bountyDuration && (
                                    <p className="mb-1.5">
                                      Bounty duration:
                                      {draft.bountyDuration}
                                    </p>
                                  )}
                                  {draft.bountyReward && (
                                    <p className="mb-1.5">
                                      Bounty reward: {draft.bountyReward}
                                    </p>
                                  )}
                                  {draft.bountyLink && (
                                    <p className="mb-1.5">
                                      Bounty link: {draft.bountyLink}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Drafts>
                        )}
                      </div>
                      {!showDrafts && (
                        <div className="mt-3 mb-6 sm:px-7 px-3 flex sm:flex-row max-sm:flex-col max-sm:items-start gap-3 items-center">
                          {postType === "feed-post" && (
                            <FeedPostsFooter
                              onSelect={handleSelectEmoji}
                              inputText={text}
                              draftItems={draftItems}
                              onSetDraftItems={setDraftItems}
                              images={images}
                              setImages={setImages}
                              savedMsg={savedMsg}
                              setSavedMsg={setSavedMsg}
                            />
                          )}
                          <DialogFooter className="sm:self-end">
                            <Button
                              className="bg-[#430b68] hover:bg-[#430b68] rounded-full py-2 "
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Posting..." : <p className="px-4">Post</p>}
                              
                            </Button>
                          </DialogFooter>
                        </div>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="w-1/2">
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className="w-full font-sans bg-black hover:bg-white hover:text-black text-white rounded-full py-3 mb-4 max-sm:text-[13px] max-sm:font-semibold">
                        Edit Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className=" font-sans bg-[#161616] border-[#303030] rounded-2xl py-8 px-7 sm:max-w-[425px] lg:max-w-[480px] !max-h-[90vh] max-sm:!max-h-[95vh] overflow-auto"
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
                  </form>
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
                <Feedscard pioneer={true} />
              </div>
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="events">
              <Feedscard pioneer={true} />
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="hiring">
              <Feedscard pioneer={true} />
            </TabsContent>
            <TabsContent className="relative w-full h-full" value="bounties">
              <Feedscard pioneer={true} />
            </TabsContent>
            <TabsContent
              className="relative w-full h-full"
              value="announcements"
            >
              <Feedscard pioneer={true} />
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
