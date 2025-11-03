"use client";
import React, { useEffect, useState, useMemo } from "react";
import BountyCard from "@/src/components/bountyCard";
import { Input } from "@/src/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getBounties } from "@/src/redux/slices/bountiesSlice";
import { BountyItem } from "@/src/types/bounties.types";
import { RootState } from "@/src/redux/store";
import { useInView } from "react-intersection-observer";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const Bounty = () => {
  const dispatch = useAppDispatch();
  const { loading, error, bountyData } = useAppSelector(
    (state: RootState) => state.bounties
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    dispatch(getBounties({ page: 1, limit: 100 }));
  }, [dispatch]);

  const filteredBounties = useMemo(() => {
    if (!bountyData) return [];
    return bountyData.filter((bounty) => {
      const titleMatch = bounty.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descMatch = bounty.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [bountyData, searchTerm]);

  const paginatedBounties = useMemo(() => {
    const start = 0;
    const end = page * ITEMS_PER_PAGE;
    return filteredBounties.slice(start, end);
  }, [filteredBounties, page]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      paginatedBounties.length < filteredBounties.length
    ) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, paginatedBounties.length, filteredBounties.length]);

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex gap-x-2.5 items-center mb-4">
        <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
          <FiSearch color="#9F9F9F" className="text-xl" />
          <Input
            type="text"
            placeholder="Search bounty title or keyword"
            className="font-sans border-0 focus-visible:ring-0 p-0"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 gap-y-4">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="w-full h-[90px]" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {paginatedBounties.length > 0 ? (
              paginatedBounties.map((bounty, index) => (
                <div
                  key={bounty.uuid}
                  ref={index === paginatedBounties.length - 1 ? ref : undefined}
                >
                  <BountyCard bounty={bounty} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-base text-center">
                No bounties found
              </p>
            )}
          </div>

          {paginatedBounties.length < filteredBounties.length && (
            <div ref={ref} className="flex justify-center my-4">
              <Skeleton className="w-full h-[90px]" />
            </div>
          )}
        </>
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
  );
};

export default Bounty;
