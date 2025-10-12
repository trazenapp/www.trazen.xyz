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
import Picker, { Theme } from "emoji-picker-react";
import { Emoji32Regular } from "@fluentui/react-icons";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface FeedsCommmentProps {
  isComment: boolean;
  uuid?: string;
}

const FeedsComment = ({ isComment = false, uuid }: FeedsCommmentProps) => {
  const dispatch = useAppDispatch();
  const { result, uploading, uploadFiles, reset } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField
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
        commentOnPost({ post_uuid: uuid as string, content: data.content })
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
        className="flex items-start gap-x-2.5 border border-[#303030] rounded-[10px] py-2.5 px-3.5"
      >
        <div className="flex flex-col gap-y-2.5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
              CN
            </AvatarFallback>
          </Avatar>
          {/* {isComment && (
            <div className="flex gap-x-1.5">
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
              placeholder="Add a comment"
              className="flex-1 border-0 shadow-none font-sans focus-visible:ring-0 font-light text-sm"
              {...field}
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
                  <Button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="bg-transparent !p-0 hover:bg-transparent"
                  >
                    <Emoji32Regular />
                  </Button>
                  {showEmojiPicker && (
                    <div className="absolute z-50 top-10 left-0">
                      <Picker
                        theme={Theme.DARK}
                        onEmojiClick={handleEmojiClick}
                      />
                    </div>
                  )}
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
