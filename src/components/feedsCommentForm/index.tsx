"use client";
import React, { useRef, useState, useEffect } from "react";
import { Emoji32Regular } from "@fluentui/react-icons";
import Picker, { Theme, EmojiStyle } from "emoji-picker-react";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/src/redux/store";
import { commentOnPost, commentOnComment } from "@/src/redux/slices/postSlice";
import { ClipLoader } from "react-spinners";
import AvatarProfile from "../avatarProfile";
import { Textarea } from "../ui/textarea";
import { toast } from "react-hot-toast";

interface FeedsCommentFormProps {
  parentCommentUuid?: string;
  postUuid?: string;
  postAuthor?: string;
  placeholder?: string;
  onSuccess?: () => void;
}

const FeedsCommentForm = ({
  parentCommentUuid,
  postUuid,
  postAuthor,
  placeholder = "Write a comment...",
  onSuccess,
}: FeedsCommentFormProps) => {
  const dispatch = useAppDispatch();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, setValue, resetField, watch } = useForm<{
    content: string;
    medias?: string[];
  }>({
    defaultValues: { content: "", medias: [] },
  });

  const content = watch("content");

  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData: any) => {
    const currentText = content || "";
    setValue("content", currentText + emojiData.emoji);
  };

  const onSubmit = async (data: { content: string }) => {
    if (!data.content.trim()) return;

    setSubmitting(true);
    try {
      if (parentCommentUuid) {
        await dispatch(
          commentOnComment({
            comment_uuid: parentCommentUuid,
            content: data.content,
          })
        ).unwrap();
      } else if (postUuid) {
        await dispatch(
          commentOnPost({
            post_uuid: postUuid as string,
            content: data.content,
          })
        ).unwrap();
      }

      toast.success((t) => <div>Comment posted successfully</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      resetField("content");
      setShowEmoji(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(
        (t) => <div>{err?.message || "Failed to post comment"}</div>,
        {
          style: { background: "#161616", color: "#fff" },
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5"
      >
        <div className="w-full flex items-center gap-x-2.5 py-2.5 px-3.5">
          {" "}
          <div className="flex flex-col justify-center items-center h-fit">
            <AvatarProfile avatar={postAuthor} />
          </div>
          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Textarea
                {...field}
                ref={(el: any) => {
                  field.ref(el);
                  if (el) {
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }
                }}
                placeholder="Add a comment ..."
                className="flex-1 resize-none overflow-hidden border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm min-h-9 leading-tight transition-[height] duration-200 ease-in-out"
                onChange={(e) => {
                  field.onChange(e);
                  const target = e.target;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            )}
          />
          <div className=" flex sm:flex-row flex-col items-start gap-7 sm:items-center sm:justify-between">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <div className="relative flex items-center">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmojiPicker((prev) => !prev);
                    }}
                    className="bg-transparent p-0! hover:bg-transparent"
                  >
                    <Emoji32Regular />
                  </Button>
                  {showEmojiPicker && (
                    <div
                      ref={pickerRef}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute z-50 right-0 top-full"
                    >
                      <Picker
                        theme={Theme.DARK}
                        onEmojiClick={handleEmojiClick}
                        emojiStyle={EmojiStyle.GOOGLE}
                        lazyLoadEmojis={true}
                        width={320}
                        height={400}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="text-[#f4f4f4] text-light text-xs font-sans px-4 py-1.5 rounded-[6px] bg-[#430B68] hover:bg-[#430B68]"
          >
            {submitting ? <ClipLoader color="#F4F4F4F4" size={10} /> : "Post"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FeedsCommentForm;
