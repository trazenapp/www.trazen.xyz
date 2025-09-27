"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "./input";
import { Button } from "./button";
import { useAppSelector } from "@/redux/store";
import { ClipLoader } from "react-spinners";
import img from "@/public/pdf2.svg";

type FileOrUrlInputProps = {
  onChange: (value: string) => void;
};

const InputFile: React.FC<FileOrUrlInputProps> = ({ onChange }) => {
  const { token } = useAppSelector((state) => state.register);
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setFileName(null);
    onChange(value);
  };

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setLoading(true)
    setFileName(file.name);

    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FILE_URL}/api/storage`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const fileUrl = data.data.path as string;
      // const filePreviewUrl = `${previewFileUrl}/${data.data.path as string}`;
      setUrl(fileUrl);
      onChange(fileUrl);
    }catch(error){
      console.log("Upload Error: ", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="flex items-center border border-[#434343] rounded-md px-2 py-1">
      {fileName && !loading && (
        <div className="ml-2 text-[10px] text-[#C4C4C4] flex items-center gap-x-1.5 flex-1">
          <Image src={img} alt="upload icon" />
          {fileName}
        </div>
      )}
      {!fileName && <Input
        type="text"
        placeholder="Enter link or"
        value={url}
        onChange={handleUrlChange}
        className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />}
      <label htmlFor="docFile" className="ml-2 bg-[#430B68] hover:bg-[#430B68] px-5 py-1.5 w-fit rounded-[4px]">
        <input type="file" id="docFile" className="hidden" onChange={handleFileChange} />
        {loading ? <ClipLoader size={10} color="#fff" /> : "Upload"}
      </label>
      
    </div>
  );
};

export default InputFile;
