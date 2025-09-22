"use client"
import React, { useState } from 'react'
import { Input } from './input'
import { Button } from './button'

type FileOrUrlInputProps = {
onChange: (value: string) => void;
};

const InputFile: React.FC<FileOrUrlInputProps> = ({ onChange }) => {

  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setFileName(null); 
    onChange(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileName(file.name);
      setUrl(fileUrl); 
      onChange(fileUrl);
    }
  };

  return (
    <div className="flex items-center border border-[#434343] rounded-md px-2 py-1">
      <Input
        type="text"
        placeholder="Enter link or"
        value={url}
        onChange={handleUrlChange}
        className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button type="button" className="ml-2 bg-[#430B68] hover:bg-[#430B68] px-5 py-1.5">
          Upload
        </Button>
      </label>
      {fileName && (
        <span className="ml-2 text-sm text-muted-foreground">{fileName}</span>
      )}
    </div>
  )
}

export default InputFile