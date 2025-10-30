"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EventCard from "@/components/eventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getEvents } from "@/redux/slices/eventSlice";
import { EventsItem } from "@/types/event.types";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUp } from "lucide-react";

const Event = () => {
  const dispatch = useAppDispatch();
  const { loading, events, pagination, hasMore } = useAppSelector(
    (state) => state.events
  );

  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(getEvents({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        dispatch(
          getEvents({
            page: nextPage,
            limit: pagination?.limit ?? 10,
          })
        );
        return nextPage;
      });
    }
  }, [inView, hasMore, loading, dispatch, pagination?.limit]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTop(currentY > 400);
      setScrollUp(currentY < lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
        Events
      </h4>
      <div className="grid grid-cols-1 gap-y-4">
        {loading && events?.length === 0
          ? [...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-[200px] my-4" />
            ))
          : events?.map((post, index) => {
              return (
                <div
                  key={post.uuid}
                  ref={index === events.length - 1 ? ref : undefined}
                  className="not-last:mb-3"
                >
                  <EventCard key={post.uuid} event={post as EventsItem} isPrivate={false} />
                </div>
              );
            })}

        {loading && events && events.length > 0 && (
          <Skeleton className="w-full h-[200px] my-4" />
        )}

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: scrollUp ? 0.5 : 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-[#1E1E1E] text-white shadow-lg border border-[#303030] backdrop-blur-md hover:opacity-100 transition"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Event;
