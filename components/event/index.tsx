"use client";
import React, { useCallback, useEffect, useRef } from "react";
import EventCard from "@/components/eventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getEvents } from "@/redux/slices/eventSlice";
import { EventsItem } from "@/types/event.types";

const Event = () => {
  const dispatch = useAppDispatch();
  const { loading, events, pagination, hasMore } = useAppSelector(
    (state) => state.events
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            getEvents({
              page: pagination.page + 1,
              limit: pagination.limit,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pagination.page, pagination.limit, dispatch]
  );

  useEffect(() => {
    dispatch(getEvents({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <>
      <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
        Events
      </h4>
      {events &&
        events.map((event) =>
          loading ? (
            <Skeleton
              key={event.uuid}
              className="w-full h-[150px] rounded-[16px]"
            />
          ) : (
            <EventCard key={event.uuid} event={event as EventsItem} />
          )
        )}
    </>
  );
};

export default Event;
