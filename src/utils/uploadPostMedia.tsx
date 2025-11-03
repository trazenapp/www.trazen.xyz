import { useState } from "react";
import axiosInstance from "@/src/utils/axios";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = `${process.env.NEXT_PUBLIC_FILE_URL}/api/storage`;

  const uploadFiles = async (files: FileList) => {
    try {
      setUploading(true);
      setError(null);

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axiosInstance.post(baseUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.data.path;
      });

      const urls = await Promise.all(uploadPromises);
      setResult(urls.length === 1 ? urls[0] : urls);
      return urls.length === 1 ? urls[0] : urls;
    } catch (err: any) {
      setError("Upload failed. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { uploading, result, error, uploadFiles, reset };
};
