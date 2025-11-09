"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "@/public/file-upload.svg";
import { useAppSelector } from "@/src/redux/store";
import { ClipLoader } from "react-spinners";
import axiosInstance from "@/src/utils/axios";

interface FileInputProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}

const FileInput = ({ value, onChange }: FileInputProps) => {
  const token =
    useAppSelector((state) => state.login.token) ||
    useAppSelector((state) => state.login.currentUser?.token) ||
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  const baseUrl = `${process.env.NEXT_PUBLIC_FILE_URL}/api/storage`;
  const previewFileUrl = process.env.NEXT_PUBLIC_FILE_PREVIEW_URL;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    const tempUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(tempUrl);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await axiosInstance.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      });

      // if (!res.ok) throw new Error("Upload failed");

      const data = res.data.data;
      setIsUploaded(true);
      const fileUrl = data.path as string;
      // console.log(fileUrl);
      const filePreviewUrl = `${previewFileUrl}/${data.path as string}`;
      onChange(filePreviewUrl);
      setPreviewUrl(filePreviewUrl);
      // console.log(filePreviewUrl);
    } catch (err) {
      console.error("Upload error:", err);
      onChange(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-dashed border-[#434343] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 w-full mx-auto font-sans">
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
            {uploading ? (
              <p>
                Uploading... Please wait{" "}
                <ClipLoader color="#F4F4F4F4" size={10} />
              </p>
            ) : (
              "Browse"
            )}
          </label>
        </div>
      </label>
      <p className="text-[#98A2B3] text-xs font-normal">JPG, PNG (Max. 5mb)</p>

      {isUploaded && (
        <div className="relative w-40 h-40">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="preview"
              fill
              className="rounded-md object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;
