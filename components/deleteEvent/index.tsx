import React, { useState } from "react";
import { EventsItem } from "@/types/event.types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteEvents } from "@/redux/slices/eventSlice";
import { HiringPost } from "@/types/hiring.types";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface DeleteEventProps {
  post?: EventsItem;
}

const DeleteEvent = ({ post }: DeleteEventProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = async () => {
    try {
      setLoading(true);
      await dispatch(deleteEvents(post?.uuid as string)).unwrap();
      toast(<div>Event deleted successfully</div>, {
        theme: "dark",
        type: "success",
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast(<div>{err.message || "Failed to delete event"}</div>, {
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
        onClick={handleDeleteEvent}
        className="bg-[#ff5151] text-base rounded-full mb-4"
      >
        {loading ? <ClipLoader color="#F4F4F4F4" size={20} /> : "Delete"}
      </Button>
    </div>
  )
}

export default DeleteEvent