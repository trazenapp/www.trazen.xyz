"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "@/public/file-upload.svg";

interface FileInputProps {
  onChange: (file: File | null) => void;
}

const FileInput = ({ onChange }: FileInputProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange?.(selectedFile);
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
            Browse
          </label>
        </div>
      </label>
      <p className="text-[#98A2B3] text-xs font-normal">
        JPG, PNG (Max. 5mb)
      </p>

      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>File:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
