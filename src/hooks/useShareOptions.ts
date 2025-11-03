"use client";
import { useCallback } from "react";

type ShareOptions = {
  title: string;
  text: string;
  url: string;
};

export const useShare = () => {
  const shareContent = useCallback(async ({ title, text, url }: ShareOptions) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        console.log("Content shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert("Unable to share or copy the link.");
      }
    }
  }, []);

  return { shareContent };
};
