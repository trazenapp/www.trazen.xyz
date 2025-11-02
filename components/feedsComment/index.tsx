"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineImage } from "react-icons/md";
import { useFileUpload } from "@/utils/uploadPostMedia";
import { commentOnPost } from "@/redux/slices/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import Picker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Emoji32Regular } from "@fluentui/react-icons";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { PostItem } from "@/types/post.types";
import AvatarProfile from "../avatarProfile";

interface FeedsCommmentProps {
  isComment: boolean;
  uuid?: string;
  post?: PostItem;
}

const FeedsComment = ({
  isComment = false,
  uuid,
  post,
}: FeedsCommmentProps) => {
  const dispatch = useAppDispatch();
  const { result, uploading, uploadFiles, reset } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const values = watch();

  // useEffect(() => {
  //   if (result) {
  //     const medias = Array.isArray(result) ? result : [result];
  //     setValue("medias", medias);
  //   }
  // }, [result, setValue]);

  // useEffect(() => {
  //   return () => {
  //     localPreviews.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [localPreviews]);

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const files = Array.from(e.target.files);
  //   //   const previews = files.map((file) => URL.createObjectURL(file));
  //   // setLocalPreviews((prev) => [...prev, ...previews]);
  //   const uploaded = await uploadFiles(e.target.files);
  //   if (uploaded) {
  //     const urls = Array.isArray(uploaded) ? uploaded : [uploaded];
  //     setValue("medias", [...(values.medias || []), ...urls]);
  //   }
  // };

  const handleEmojiClick = (emojiData: any) => {
    const currentText = values.content || "";
    setValue("content", currentText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const onSubmit = async (data: any) => {
    console.log(uuid, data);
    setIsLoading(true);
    if (!data.content.trim()) return;
    try {
      const res = await dispatch(
        commentOnPost({
          post_uuid: post?.uuid as string,
          content: data.content,
        })
      ).unwrap();
      console.log("Comment success:", res);
      // setComment(""); // reset
      setIsLoading(false);
      toast(<div>Comment added successfully</div>, {
        theme: "dark",
        type: "success",
      });
      resetField("content");
    } catch (err: any) {
      toast(<div>{err.message || "Failed to add comment"}</div>, {
        theme: "dark",
        type: "error",
      });
      console.error("Comment failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5"
      >
        <div className="flex flex-col justify-center items-center h-fit">
          <AvatarProfile avatar={post?.avatar} />
          {/* {isComment && (
            <div className="flex gap-x-1.5 mt-2.5">
              <Button className="!p-0 !bg-transparent">
                <MdOutlineImage />
              </Button>
              <Button className="!p-0 !bg-transparent">
                <Emoji32Regular />
              </Button>
            </div>
          )} */}
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
              className="flex-1 resize-none overflow-hidden border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm min-h-[36px] leading-tight transition-[height] duration-200 ease-in-out"
              onChange={(e) => {
                field.onChange(e);
                const target = e.target;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          )}
        />

        {!isComment && (
          <>
            <div className=" flex sm:flex-row flex-col items-start gap-7 sm:items-center sm:justify-between">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                  {/* <Label
                    htmlFor="imgInput"
                    className="bg-transparent !p-0 hover:bg-transparent"
                  >
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="imgInput"
                      onChange={handleFileChange}
                    />
                    <MdOutlineImage />
                  </Label> */}
                  <div className="relative">
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
          </>
        )}
        <Button
          type="submit"
          className="text-[#f4f4f4] text-light text-xs font-sans px-4 py-1.5 rounded-[6px] bg-[#430B68] hover:bg-[#430B68]"
        >
          {isLoading ? <ClipLoader color="#F4F4F4F4" size={10} /> : "Post"}
        </Button>
        {/* {isComment && (
      )} */}
      </form>
      {/* {(localPreviews.length > 0 ||
        (values.medias && values.medias.length > 0)) && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[...localPreviews, ...(values.medias || [])].map((img, index) => {
            const localView = `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${img}`;
            return (
              <div key={index} className="relative w-10 h-[80px]">
                <img
                  src={localView}
                  alt={`preview-${index}`}
                  className="w-10 h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "medias",
                      (values.medias || []).filter(
                        (_: string, i: number) => i !== index
                      )
                    )
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )} */}
    </>
  );
};

export default FeedsComment;
