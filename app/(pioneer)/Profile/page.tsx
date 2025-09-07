"use client";
import React from "react";
import { useState, useRef } from "react";
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

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

const Profile = () => {
  type DraftItem = {
    id: string;
    text?: string;
    image?: string[];
    description?: Descendant[];
    date?: string;
    time?: string;
    location?: string;
    eventType?: string;
  };

  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");

  const plainText = description.map((n) => Node.string(n)).join("\n");

  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const [draftItems, setDraftItems] = useLocalStorageState<DraftItem[]>(
    [],
    "drafts"
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [postType, setPostType] = useState("feed-post");
  const [showDrafts, setShowDrafts] = useState(false);
  const router = useRouter();

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
      const descriptionValidity = description.at(0);
      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        !date &&
        !time &&
        !location &&
        !eventType
      ) {
        return;
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        date &&
        time &&
        location &&
        eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          {
            id: crypto.randomUUID(),
            postType,
            date,
            time,
            location,
            eventType,
          },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            {
              id: crypto.randomUUID(),
              postType,
              date,
              time,
              location,
              eventType,
            },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        date &&
        time &&
        location &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date, time, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date, time, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        date &&
        time &&
        eventType &&
        !location
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date, time, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date, time, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        location &&
        time &&
        eventType &&
        !date
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, time, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, time, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        location &&
        date &&
        eventType &&
        !time
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, date, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, date, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        location &&
        date &&
        !time &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        time &&
        date &&
        !location &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        eventType &&
        date &&
        !location &&
        !time
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        eventType &&
        time &&
        !date &&
        !location
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, time },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, time },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        eventType &&
        location &&
        !date &&
        !time
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        time &&
        location &&
        !date &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        time &&
        !location &&
        !date &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        !time &&
        location &&
        !date &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        !time &&
        !location &&
        date &&
        !eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (
        descriptionValidity &&
        SlateElement.isElement(descriptionValidity) &&
        !descriptionValidity.children[0].text &&
        !time &&
        !location &&
        !date &&
        eventType
      ) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && !date && !time && !location && !eventType) {
        return;
      }

      if (!description && date && time && location && eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          {
            id: crypto.randomUUID(),
            postType,
            date,
            time,
            location,
            eventType,
          },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            {
              id: crypto.randomUUID(),
              postType,
              date,
              time,
              location,
              eventType,
            },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && date && time && location && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date, time, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date, time, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && date && time && eventType && !location) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date, time, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date, time, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && location && time && eventType && !date) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, time, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, time, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && location && date && eventType && !time) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, date, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, date, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && location && date && !time && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && time && date && !location && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && eventType && date && !location && !time) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && eventType && time && !date && !location) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, time },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, time },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && eventType && location && !date && !time) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && time && location && !date && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && time && !location && !date && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, time },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, time },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && !time && location && !date && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, location },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, location },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && !time && !location && date && !eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, date },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, date },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }

      if (!description && !time && !location && !date && eventType) {
        setDraftItems((drafts) => [
          ...drafts,
          { id: crypto.randomUUID(), postType, eventType },
        ]);
        localStorage.setItem(
          "drafts",
          JSON.stringify([
            ...draftItems,
            { id: crypto.randomUUID(), postType, eventType },
          ])
        );
        setSavedMsg("Draft saved");
        setTimeout(() => setSavedMsg(null), 3000);
      }
      // const newDraft =
      //   descriptionValidity.children[0].text &&
      //   date &&
      //   time &&
      //   location &&
      //   eventType
      //     ? {
      //         id: crypto.randomUUID(),
      //         postType,
      //         description,
      //         date,
      //         time,
      //         location,
      //         eventType,
      //       }
      //     : descriptionValidity.children[0].text && date && time && location
      //       ? {
      //           id: crypto.randomUUID(),
      //           postType,
      //           description,
      //           date,
      //           time,
      //           location,
      //         }
      //       : descriptionValidity.children[0].text && date && time
      //         ? { id: crypto.randomUUID(), postType, description, date, time }
      //         : descriptionValidity.children[0].text && date
      //           ? { id: crypto.randomUUID(), postType, description, date }
      //           : { id: crypto.randomUUID(), postType, description };

      // if (
      //   !descriptionValidity.children[0].text &&
      //   !date &&
      //   !time &&
      //   !location &&
      //   !eventType
      // )
      //   return;

      // setDraftItems((drafts) => [...drafts, newDraft]);
      // localStorage.setItem(
      //   "drafts",
      //   JSON.stringify([...draftItems, newDraft])
      // );

      // setDescription([]);
      // setDate("");
      // setTime("");
      // setLocation("");
      // setEventType("");

      // setSavedMsg("Draft saved");
      // setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  function handleEditDraft(draft: any) {
    setPostType(draft.postType);
    draft.text && setText(draft.text);
    draft.image && setImages(draft.image);
    draft.description && setDescription(draft.description);
    draft.date && setDate(draft.date);
    draft.time && setDate(draft.time);
    draft.location && setDate(draft.location);
    draft.eventType && setDate(draft.eventType);
    setShowDrafts(false);
  }

  return (
    <>
      <div className="xl:w-[81%] lg:w-[78%] ml-auto flex filter">
        <div className="xl:w-[66.2%] lg:w-[64.6%] max-lg:px-4">
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
              <Avatar className="w-[120px] h-[120px]">
                <AvatarImage src="https://github.com/shadcn.png" className="" />
                <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 font-sans">
                <p className="text-[#f4f4f4] text-[28px] font-medium flex items-center gap-x-2 mb-4">
                  CryptoMachine <BsPatchCheckFill size={24} color="#B348F9" />
                </p>
                <p className="text-base font-normal text-[#BCBCBC]">
                  CryptoMachine is a high-speed DeFi and NFT platform built on
                  Solana, designed to power automated trading tools, digital
                  collectibles, and on-chain utilities—fast, low-cost.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-y-4 items-center gap-x-3 font-sans">
              <div className="flex flex-row items-center gap-x-2">
                <IoPeopleOutline color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span>19.3K</span>
                  <span className="text-[#7f7f7f] font-normal">Followers</span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <FaSquareXTwitter color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <Link
                    href="mailto:https://x.com/CyptoMachine"
                    className="text-[#1768FF] font-normal"
                  >
                    https://x.com/CyptoMachine
                  </Link>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <HiOutlineCube color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">
                    Solana . Ethereum
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <RxDashboard color="#7f7f7f" className="text-[1.04rem]" />
                <p className="text-[#f4f4f4] font-medium text-[0.73rem] flex gap-x-1">
                  <span className="text-[#BCBCBC] font-normal">NFTs</span>
                </p>
              </div>
            </div>
            <div className="w-full flex gap-5">
              <div className="w-1/2">
                <Dialog
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setShowDrafts(false);
                      setPostType("feed-post");
                      setText("");
                    }
                  }}
                >
                  <form>
                    <DialogTrigger asChild>
                      <Button className="w-full font-sans bg-white hover:bg-black hover:text-white text-black rounded-full py-3 mb-4">
                        <PlusIcon />
                        <span>New Post</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className=" font-sans gap-2 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[47vw] lg:max-w-[65vw] md:max-w-[80vw] sm:max-w-[87vw] max-w-[98vw]  max-h-[95vh] overflow-auto"
                      style={{ scrollbarWidth: "none" }}
                    >
                      <DialogHeader className="py-4 px-7 border-b-[1px] border-b-[#383838]">
                        <DialogTitle className="flex items-center justify-between font-medium text-[20px] text-[#f4f4f4] ">
                          {showDrafts ? "Drafts" : "New post"}
                          {savedMsg && !showDrafts && (
                            <div className=" font-sans ml-32 text-[#21a80f] text-[14px] font-bold animate-fade">
                              {savedMsg}
                            </div>
                          )}
                          {!showDrafts && (
                            <div className="flex gap-6">
                              <Button
                                className="bg-transparent !p-0 hover:bg-transparent"
                                onClick={handleSaveDrafts}
                              >
                                <LuFilePenLine style={{ color: "#a6a6a6" }} />
                                <p className="text-[#a6a6a6]">Save as draft</p>
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowDrafts(true);
                                  setSavedMsg("");
                                }}
                                className="mr-9 rounded-full border-[#303030] border-[1px] py-1.5 gap-1 font-light text-[14px] text-[#f4f4f4]  "
                              >
                                <LuFilePenLine className="text-[#f4f4f4] " />
                                <span>Drafts</span>
                              </Button>
                            </div>
                          )}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2 py-2 px-7">
                        {!showDrafts && (
                          <Select
                            value={postType}
                            onValueChange={(val) => {
                              setShowDrafts(false);
                              setPostType(val);
                            }}
                          >
                            <SelectTrigger className="font-sans w-max py-5 px-4  border-[#434343] text-[#f4f4f4] rounded-full ">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="font-sans bg-[#161616] border-[#303030] rounded-2xl">
                              <SelectGroup className="w-[200px]">
                                <SelectLabel className="text-[#f4f4f4] text-[16px] ">
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
                                  className="text-[#bcbcbc] text-[14px] focus:bg-[#303030] focus:text-[#fff]"
                                  value="bounties"
                                >
                                  Bounties
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                        {!showDrafts && postType === "feed-post" && (
                          <FeedPostsMain
                            ref={inputRef}
                            value={text}
                            onChange={setText}
                          />
                        )}
                        {!showDrafts && postType === "events" && (
                          <>
                            <EventsPost
                              description={description}
                              setDescription={setDescription}
                              date={date}
                              setDate={setDate}
                              time={time}
                              setTime={setTime}
                              location={location}
                              setLocation={setLocation}
                              eventType={eventType}
                              setEventType={setEventType}
                            />
                          </>
                        )}
                        {!showDrafts && postType === "hiring" && <HiringPost />}
                        {!showDrafts && postType === "bounties" && (
                          <BountyPost />
                        )}
                        {showDrafts && draftItems.length < 1 && (
                          <Drafts>
                            <div className="flex flex-col items-center gap-3 min-h-[50vh] justify-center pb-4">
                              <LuFilePenLine
                                className="text-[#a6a6a6]"
                                size={100}
                                strokeWidth={1}
                              />
                              <p className="text-[#dddddd] text-xl ">
                                Your drafts is empty
                              </p>
                              <p className="text-[#7f7f7f] text-sm ">
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
                                  <div className="flex w-max gap-7 justify-end ml-auto">
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
                                  {draft.text && <p>{draft.text}</p>}{" "}
                                  {draft.image && (
                                    <div className="h-max grid grid-cols-2 gap-2 mt-2">
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
                                  {draft.date && <p>{draft.date}</p>}
                                  {draft.time && <p>{draft.time}</p>}
                                  {draft.location && <p>{draft.location}</p>}
                                  {draft.eventType && <p>{draft.eventType}</p>}
                                </div>
                              ))}
                            </div>
                          </Drafts>
                        )}
                      </div>
                      {!showDrafts && (
                        <div className="mt-3 mb-6 px-7 flex gap-3 items-center">
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
                          <DialogFooter className="self-end">
                            <Button
                              className="bg-[#430b68] hover:bg-[#430b68] rounded-full py-2 "
                              type="submit"
                            >
                              <p className="px-4">Post</p>
                            </Button>
                          </DialogFooter>
                        </div>
                      )}
                    </DialogContent>
                  </form>
                </Dialog>
              </div>

              <div className="w-1/2">
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className="w-full font-sans bg-black hover:bg-white hover:text-black text-white rounded-full py-3 mb-4">
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
              <TabsList className="bg-transparent border-b border-b-[#303030] py-0 h-fit flex-1 rounded-none w-full mb-8 md:mb-8 font-sans justify-between">
                <TabsTrigger
                  value="feed-post"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
                >
                  Feed Post
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
                >
                  Events
                </TabsTrigger>
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
                <TabsTrigger
                  value="announcements"
                  className="text-[#B8B8B8] font-normal py-2 rounded-none flex-none data-[state=active]:font-medium data-[state=active]:text-[#F4F4F4F4] data-[state=active]:bg-transparent data-[state=active]:!border-b-[1.5px] data-[state=active]:border-b-white"
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

        <div className="flex-1 h-4 "></div>

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
