"use client";
import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Input } from "@/components/ui/input";
import { Smile } from "lucide-react";
import { Image16Regular } from "@fluentui/react-icons";
import { MdDoneAll } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { LuFilePenLine } from "react-icons/lu";
import Picker, { Theme, EmojiClickData } from "emoji-picker-react";
import { text } from "stream/consumers";

type MainProps = {
  value: string;
  onChange: (val: string) => void;
};

export const FeedPostsMain = forwardRef<HTMLInputElement, MainProps>(
  ({ value, onChange }, ref) => {
    return (
      <div>
        <Input
          id="feed-post"
          name="feed-post"
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="border-none focus-visible:!ring-[0] sm:!text-[15px] max-sm:text-[13px] font-normal outline-none max-sm:mt-3 "
          placeholder="Share your thoughts..."
        />
      </div>
    );
  }
);

FeedPostsMain.displayName = "FeedPostsMain";

type FooterProps = {
  onSelect: (emoji: string) => void;
  inputText: string;
  draftItems: DraftItem[];
  onSetDraftItems: React.Dispatch<React.SetStateAction<DraftItem[]>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  savedMsg: string | null;
  setSavedMsg: React.Dispatch<React.SetStateAction<string | null>>;
};

type DraftItem = {
  id: string;
  text?: string;
  image?: string[];
};

export function FeedPostsFooter({
  onSelect,
  inputText,
  draftItems,
  onSetDraftItems,
  images,
  setImages,
  savedMsg,
  setSavedMsg,
}: FooterProps) {
  const [showPicker, setShowPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const PICKER_WIDTH = 320;
  const PICKER_HEIGHT = 360;
  const GAP = 8;

  const computePosition = () => {
    const btn = buttonRef.current;
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

  useEffect(() => {
    if (!showPicker) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        pickerRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setShowPicker(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPicker(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [showPicker]);

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }
  function handleImageClick() {
    fileInputRef.current?.click();
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result)
          setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="w-full max-sm:w-max flex flex-col gap-4">
      {images.length > 0 && (
        <div className="h-max grid grid-cols-2 gap-2 mt-2">
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-[200px]">
              <img
                src={img}
                alt={`preview-${index}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-[rgba(22,22,22,0.9)] cursor-pointer text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="sm:flex-1 flex sm:flex-row flex-col items-start gap-7 sm:items-center sm:justify-between">
        <div className="flex gap-3 items-center">
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Button
            className="bg-transparent !p-0"
            type="button"
            onClick={handleImageClick}
          >
            <Image16Regular
              style={{ width: 25, height: 25, color: "#a6a6a6" }}
            />
          </Button>

          <Button
            ref={buttonRef}
            className="bg-transparent !p-0"
            type="button"
            onClick={() => setShowPicker((v) => !v)}
          >
            <Smile style={{ width: 25, height: 25, color: "#a6a6a6" }} />
          </Button>
        </div>

        <div className="flex gap-5">
          <Button className="bg-transparent !p-0 hover:bg-transparent">
            <MdDoneAll style={{ width: 20, height: 20, color: "#a6a6a6" }} />
            <p className="text-[#a6a6a6] max-sm:text-[13px]">
              Mark as announcement
            </p>
          </Button>
        </div>
      </div>

      {showPicker &&
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
                onSelect(emojiData.emoji);
              }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
