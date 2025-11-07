"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchNotifications } from "@/src/redux/slices/notificationsSlice";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import NotificationCard from "@/src/components/notificationCard";
import { NotificationItem } from "@/src/types/notifications.types";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Notification = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading, pagination, hasMore } = useAppSelector(
    (state) => state.notifications
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(
      fetchNotifications({
        method: "",
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      dispatch(
        fetchNotifications({
          method: "",
          page: pagination.page + 1,
          limit: pagination.limit,
        })
      );
    }
  }, [inView]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white text-base font-medium font-sans lg:flex hidden">
          Notifications
        </h4>
        <Button className="bg-transparent font-sans text-sm! py-1.5! font-normal">
          <IoCheckmarkDoneSharp />
          Mark all as read
        </Button>
      </div>
      {loading && notifications.length === 0
        ? [...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[200px] my-4" />
          ))
        : notifications.map((notif, index) => (
            <div
              key={notif.uuid}
              ref={index === notifications.length - 1 ? ref : undefined}
              className="not-last:mb-4"
            >
              <NotificationCard notification={notif} />
            </div>
          ))}

      {loading && notifications.length > 0 && (
        <Skeleton className="w-full h-[200px] my-4" />
      )}
    </>
  );
};

export default Notification;
