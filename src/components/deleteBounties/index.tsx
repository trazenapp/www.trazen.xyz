"use client";
import React, { useState } from 'react'
import { BountyItemResponse } from '@/src/types/bounties.types';
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { deleteBounties } from "@/src/redux/slices/bountiesSlice";
import { HiringPost } from "@/src/types/hiring.types";
import { Button } from "@/src/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface DeleteBountiesProps {
  post?: BountyItemResponse;
}

const DeleteBounties = ({ post }: DeleteBountiesProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteBounty = async () => {
    try {
      setLoading(true);
      await dispatch(deleteBounties(post?.uuid as string)).unwrap();
      toast(<div>Bounty deleted successfully</div>, {
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
        onClick={handleDeleteBounty}
        className="bg-[#ff5151] text-base rounded-full mb-4"
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Delete"}
      </Button>
    </div>
  )
}

export default DeleteBounties