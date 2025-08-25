import React from "react";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/notificationCard";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Notifications = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
          Notifications
        </h4>
        <Button className="bg-transparent font-sans text-base font-normal">
          <IoCheckmarkDoneSharp />
          Mark all as read
        </Button>
      </div>
      <NotificationCard />
    </>
  );
};

export default Notifications;
