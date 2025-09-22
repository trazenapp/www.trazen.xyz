"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "@/public/file-upload.svg";

interface FileInputProps {
  value?: string | null; 
  onChange: (value: string | null) => void;
}

const FileInput = ({ value, onChange }: FileInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userID, setUserID] = useState<string | null>(null);

  // Get userID from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("User");
      setUserID(user ? JSON.parse(user).uuid : null);
    }
  }, []);

  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  // console.log(userID)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    const tempUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(tempUrl);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (userID) formData.append("userID", userID);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FILE_URL}/api/storage`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${userID}` },
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log(data);
      const fileUrl = data.url as string;

      onChange(fileUrl);
      setPreviewUrl(fileUrl);
    } catch (err) {
      console.error("Upload error:", err);
      onChange(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-dashed border-[#434343] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 w-full max-w-md mx-auto font-sans">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".svg,.png,.jpg,.jpeg,.gif"
        onChange={handleFileChange}
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer text-[#9F9F9F] font-medium flex flex-col justify-center items-center gap-y-4 text-sm"
      >
        <Image src={img} alt="upload icon" />
        <div>
          <span className="hover:no-underline">
            Drag and drop documents here or
          </span>
          <label
            htmlFor="file-upload"
            className="text-white px-2 py-2 rounded-md mt-2 cursor-pointer transition"
          >
            {uploading ? "Uploading..." : "Browse"}
          </label>
        </div>
      </label>
      <p className="text-[#98A2B3] text-xs font-normal">JPG, PNG (Max. 5mb)</p>

      {previewUrl && (
        <div className="relative w-40 h-40">
          <Image
            src={previewUrl}
            alt="preview"
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
