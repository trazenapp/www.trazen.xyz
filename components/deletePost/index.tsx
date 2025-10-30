"use client";
import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { deletePost } from "@/redux/slices/postSlice";
import { Post, PostItem } from "@/types/post.types";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface DeletePostProps {
  post?: PostItem;
}

const DeletePost = ({ post }: DeletePostProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await dispatch(deletePost(post?.uuid as string)).unwrap();
      toast(<div>Post deleted successfully</div>, {
        theme: "dark",
        type: "success",
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast(<div>{err.message || "Failed to delete post"}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };
  return (
    <div className="px-6 py-4 flex flex-col items-center justify-center gap-y-8">
      {/* <span className="w-[80px] h-[80px] rounded-full text-[#ff5151] bg-[#ff5151]/[40%] flex justify-center items-center">
        <TriangleAlert size={35} />
      </span> */}
      <p className="font-sans text-2xl">Are You Sure?</p>
      <Button
        onClick={handleDeletePost}
        className="bg-[#ff5151] text-base rounded-full mb-4"
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Delete"}
      </Button>
    </div>
  );
};

export default DeletePost;
