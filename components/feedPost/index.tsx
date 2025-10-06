"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Image16Regular } from "@fluentui/react-icons";
import { MdDoneAll } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Smile,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link2,
  ImageIcon,
  X,
} from "lucide-react";
import { LuFilePenLine } from "react-icons/lu";
import Picker, { Theme } from "emoji-picker-react";
import { text } from "stream/consumers";
import ToolbarButton from "@/components/toolbarButton";
import { useFileUpload } from "@/utils/uploadPostMedia";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createPost,
  saveDraft,
  publishPost,
  setLoading,
  resetForm,
} from "@/redux/slices/postSlice";
import { PostState, FormType, Draft, Post } from "@/types/post.types";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface FeedsPostMainProps {
  projectId: string;
}

export const FeedPostsMain = ({ projectId }: FeedsPostMainProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, data, error } = useAppSelector(
    (state: RootState) => state.post
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<Post>({
    defaultValues: data,
  });
  const values = watch();

  const { result, uploading, uploadFiles, reset } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSaveDraft = () => {
    dispatch(saveDraft({ type: "feed", data: values }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    //   const previews = files.map((file) => URL.createObjectURL(file));
    // setLocalPreviews((prev) => [...prev, ...previews]);
    const uploaded = await uploadFiles(e.target.files);
    if (uploaded) {
      const urls = Array.isArray(uploaded) ? uploaded : [uploaded];
      setValue("medias", [...(values.medias || []), ...urls]);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    const currentText = values.content || "";
    setValue("content", currentText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (result) {
      const medias = Array.isArray(result) ? result : [result];
      setValue("medias", medias);
    }
  }, [result, setValue]);

  useEffect(() => {
    return () => {
      localPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [localPreviews]);

  const [showPicker, setShowPicker] = useState(false);

  const PICKER_WIDTH = 320;
  const PICKER_HEIGHT = 360;
  const GAP = 8;

  const computePosition = () => {
    const btn = document.querySelector<HTMLButtonElement>(
      'button[aria-label="emoji-picker"]'
    );
    if (!btn) return { top: 0, left: 0 };
    const r = btn.getBoundingClientRect();
    return {
      top: r.top + window.scrollY - PICKER_HEIGHT - GAP,
      left: r.left + window.scrollX - Math.max(0, (PICKER_WIDTH - r.width) / 2),
    };
  };

  const [coords, setCoords] = useState(() => computePosition());

  useEffect(() => {
    if (!showPicker) return;
    const update = () => setCoords(computePosition());
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [showPicker]);

  const onSubmit = async (data: Post) => {
    try {
      dispatch(setLoading(true));
      const payload = {
        project_uuid: projectId,
        is_published: true,
        content: data.content,
        medias: data.medias,
      };
      dispatch(publishPost({ type: "feed", data: payload }));
      await dispatch(createPost(payload as any)).unwrap();
      toast(<div>Post published successfully</div>, {
        theme: "dark",
        type: "success",
      });
      dispatch(setLoading(false));
      resetField("content")
      resetField("medias")
      resetField("is_published")
      resetField("project_uuid")
    } catch (err: any) {
      dispatch(setLoading(false));
      toast(<div>{err.message || "Failed to publish post"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4 mb-4">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              className="max-w-full border-gray-300 rounded-md focus-visible:ring-0"
              placeholder="Share your thoughts..."
              {...field}
            />
          )}
        />
      </div>
      <div className="w-full max-sm:w-max flex flex-col gap-4">
        {(localPreviews.length > 0 ||
          (values.medias && values.medias.length > 0)) && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[...localPreviews, ...(values.medias || [])].map((img, index) => {
              const localView = `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${img}`;
              return (
                <div key={index} className="relative w-full h-[180px]">
                  <img
                    src={localView}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "medias",
                        (values.medias || []).filter((_, i) => i !== index)
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
        )}

        <div className="sm:flex-1 flex sm:flex-row flex-col items-start gap-7 sm:items-center sm:justify-between">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-x-4">
              {!uploading && <Label
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
                <ImageIcon
                  style={{ width: 20, height: 20, color: "#a6a6a6" }}
                />
              </Label>}
              {uploading && (
                <ClipLoader color="#F4F4F4F4" size={10} />
              )}
              <Button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="bg-transparent !p-0 hover:bg-transparent"
              >
                <Smile style={{ width: 20, height: 20, color: "#a6a6a6" }} />
              </Button>
              {showEmojiPicker && (
                <div className="absolute z-50 top-10 left-0">
                  <Picker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <div className="flex gap-x-5">
              <Button
                type="button"
                onClick={onSaveDraft}
                className="bg-transparent text-[#a6a6a6] hover:bg-transparent"
              >
                Save Draft
              </Button>
              <Button className="bg-transparent !p-0 hover:bg-transparent">
                <MdDoneAll
                  style={{ width: 20, height: 20, color: "#a6a6a6" }}
                />
                <p className="text-[#a6a6a6] max-sm:text-[13px]">
                  Mark as announcement
                </p>
              </Button>
              <Button className="bg-[#430B68] rounded-full w-[111px] text-sm py-2.5">
                {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Post"}
              </Button>
            </div>
          </div>
        </div>

        {/* {showPicker &&
          createPortal(
            <div
              ref={pickerRef}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                width: PICKER_WIDTH,
                height: PICKER_HEIGHT,
                zIndex: 2147483647,
                pointerEvents: "auto",
              }}
              className="rounded-2xl border border-neutral-700 shadow-xl"
            >
              <Picker
                theme={Theme.DARK}
                width={PICKER_WIDTH}
                height={PICKER_HEIGHT}
                searchDisabled
                skinTonesDisabled
                previewConfig={{ showPreview: false }}
                onEmojiClick={(emojiData: EmojiClickData, _ev) => {
                  // onSelect(emojiData.emoji);
                }}
              />
            </div>,
            document.body
          )} */}
      </div>
    </form>
  );
};
