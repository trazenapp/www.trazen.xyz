import React, { useState } from "react";
import { FormType } from "@/src/types/post.types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/src/components/ui/dialog";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { PlusIcon } from "lucide-react";
import { LuFilePenLine } from "react-icons/lu";
import BountyPost from "@/src/components/bountyPost";
import EventsPost from "@/src/components/eventsPost";
import { FeedPostsMain } from "@/src/components/feedPost";
import HiringPost from "@/src/components/hiringPost";
import { ProjectDetail } from "@/src/types/project.types";

interface NewPostProps {
  projectDetail: ProjectDetail;
}

const NewPost = ({ projectDetail }: NewPostProps) => {
  const [formType, setFormType] = useState<FormType>("feed");
  return (
    <div className="w-1/2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full font-sans bg-white hover:bg-black hover:text-white text-black rounded-full py-3 mb-4 max-sm:text-[13px] max-sm:font-semibold">
            <PlusIcon />
            <span>New Post</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className=" font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[65vw] md:max-w-[85vw] max-md:max-w-[95vw]!  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <DialogHeader className="py-4 sm:px-7 p-4 border-b border-b-[#383838] h-auto!">
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
              <EventsPost projectId={projectDetail?.uuid} />
            )}
            {formType === "hiring" && (
              <HiringPost projectId={projectDetail?.uuid} />
            )}
            {formType === "bounties" && (
              <BountyPost projectId={projectDetail?.uuid} />
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
  );
};

export default NewPost;
