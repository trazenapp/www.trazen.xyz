"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { MdDoneAll } from "react-icons/md";
import { Button } from "@/src/components/ui/button";
import { Smile, ImageIcon, X } from "lucide-react";
import { Switch } from "@/src/components/ui/switch";
import Picker, { Theme, EmojiStyle } from "emoji-picker-react";
import { useFileUpload } from "@/src/utils/uploadPostMedia";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import RichTextEditor from "@/src/components/richTextEditor";
import { Descendant, Node, Transforms } from "slate";
import {
  createPost,
  saveDraft,
  publishPost,
  setLoading,
} from "@/src/redux/slices/postSlice";
import { Post } from "@/src/types/post.types";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { ReactEditor } from "slate-react";

interface FeedsPostMainProps {
  projectId: string;
}

export const FeedPostsMain = ({ projectId }: FeedsPostMainProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
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
    defaultValues: {
      ...data,
      content: Array.isArray(data?.content)
        ? data.content
        : [{ type: "paragraph", children: [{ text: data?.content || "" }] }],
    },
  });
  const values = watch();

  const { result, uploading, uploadFiles, reset } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<ReactEditor | null>(null);

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

  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (pickerRef.current && target && !pickerRef.current.contains(target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData: any) => {
    const editor = editorRef.current;
    if (editor) {
      ReactEditor.focus(editor);
      Transforms.insertText(editor, emojiData.emoji);
    }
    // setShowEmojiPicker(false);
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
    console.log("Submitting post data:", data);
    try {
      dispatch(setLoading(true));
      const contentAsHtml = Array.isArray(data.content)
        ? data.content.map((node: any) => Node.string(node)).join("\n")
        : data.content || "";
      const payload = {
        project_uuid: projectId,
        is_published: data.is_published,
        content: contentAsHtml,
        medias: data.medias,
      };
      dispatch(publishPost({ type: "feed", data: payload }));
      await dispatch(createPost(payload as any)).unwrap();
      toast.success((t) => <div>Post published successfully</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
      dispatch(setLoading(false));
      resetField("content");
      resetField("medias");
      resetField("is_published");
      resetField("project_uuid");
    } catch (err: any) {
      dispatch(setLoading(false));
      toast.error((t) => <div>{err.message || "Failed to publish post"}</div>, {
        style: {
          background: "#161616",
          color: "#fff",
        },
      });
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4 mb-4">
        <Controller
          name="content"
          control={control}
          rules={{
            validate: (value) =>
              (Array.isArray(value) &&
                value.some((node) => Node.string(node).trim().length > 0)) ||
              (typeof value === "string" && value.trim().length > 0) ||
              "Content required",
          }}
          render={({ field }) => {
            const safeValue: Descendant[] = Array.isArray(field.value)
              ? field.value
              : [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text:
                          typeof field.value === "string" ? field.value : "",
                      },
                    ],
                  },
                ];

            return (
              <RichTextEditor
                description={safeValue}
                setDescription={(val) => field.onChange(val)}
                editorRef={editorRef}
              />
            );
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
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
                    title="x"
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
          <div className="w-full flex flex-col md:flex-row justify-between md:items-center">
            <div className="flex flex-col md:flex-row gap-x-5 w-full">
              <div className="flex">
                <div className="flex justify-start items-center gap-x-4">
                  {/* {!uploading && (
                <Label
                  htmlFor="imgInput"
                  className="bg-transparent p-0! hover:bg-transparent"
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
                </Label>
              )} */}
                  {uploading && <ClipLoader color="#F4F4F4F4" size={10} />}
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmojiPicker((prev) => !prev);
                    }}
                    className="bg-transparent p-0! hover:bg-transparent"
                  >
                    <Smile
                      style={{ width: 20, height: 20, color: "#a6a6a6" }}
                    />
                  </Button>
                  {showEmojiPicker && (
                    <div
                      ref={pickerRef}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute z-50 top-10 left-0"
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
                <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                  <Controller
                    name="is_published"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <Label className="text-sm text-gray-400">
                          {field.value ? "Publish post" : "Save as draft"}
                        </Label>
                      </>
                    )}
                  />
                </div>
                <Button className="bg-transparent p-0! hover:bg-transparent">
                  <MdDoneAll
                    style={{ width: 20, height: 20, color: "#a6a6a6" }}
                  />
                  <p className="text-[#a6a6a6] max-sm:text-[13px]">
                    Mark as alpha
                  </p>
                </Button>
              </div>
              <Button className="bg-[#430B68] rounded-full w-full md:w-[111px] text-sm py-2.5">
                {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
