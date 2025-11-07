"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import HiringCard from "@/src/components/hiringCard";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchPublicHiring } from "@/src/redux/slices/hiringSlice";
import { deleteBookmark } from "@/src/redux/slices/bookmarkSlice";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Hiring = () => {
  const dispatch = useAppDispatch();
  const { loading, hiringPosts, pagination, hasMore } = useAppSelector(
    (state) => state.hiring
  );

  const [filter, setFilter] = useState({
    country: "",
    job_type: "",
    experience: "",
    location_type: "",
    search: "",
  });

  const [page, setPage] = useState(1);
  const [displayedPost, setDisplayedPost] = useState<any[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const itemsPerPage = 10;

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const handleFilterChange = (key: string, value: string) => {
    console.log("this checkbox was clicked");
    setFilter((prev) => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === value ? "" : value,
    }));
  };

  useEffect(() => {
    dispatch(fetchPublicHiring({ page: 1, limit: 100 }));
  }, [dispatch]);

  // filter hiring
  const filteredPosts = useMemo(() => {
    return hiringPosts.filter((post) => {
      return (
        (!filter.country ||
          post.location
            ?.toLowerCase()
            .includes(filter.country.toLowerCase())) &&
        (!filter.job_type || post.type === filter.job_type) &&
        (!filter.experience || post.experience === filter.experience) &&
        (!filter.location_type ||
          post.location_type === filter.location_type) &&
        (!filter.search ||
          post.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          post.description.toLowerCase().includes(filter.search.toLowerCase()))
      );
    });
  }, [hiringPosts, filter]);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = itemsPerPage * page;
    setDisplayedPost(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, page]);

  useEffect(() => {
    if (inView && displayedPost.length < filteredPosts.length && !loading) {
      setPage((prev: number) => {
        const nextPage = prev + 1;
        dispatch(
          fetchPublicHiring({
            page: nextPage,
            limit: pagination.limit,
          })
        );
        return nextPage;
      });
    }
  }, [inView, hasMore, dispatch, page, pagination.limit, loading]);

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

  // delete bookmark
  const handleDeleteBookmark = async (bookmark_uuid: string) => {
    console.log("hello world");
    if (!bookmark_uuid) {
      console.log("No bookmark_uuid in state");
      return;
    }

    try {
      const res = await dispatch(deleteBookmark({ bookmark_uuid })).unwrap();
      console.log("Delete bookmark response:", res);
    } catch (error) {
      console.error("Delete bookmark error:", error);
    }
  };

  // --- GSAP SCROLL IMPLEMENTATION ---
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: {
        y: 0,
      },
      duration: 0.8, // Smooth GSAP animation duration
      ease: "power2.inOut", // Professional GSAP easing
    });
  };
  // ------------------------------------

  return (
    <div className="w-full h-full">
      <div className="flex gap-x-2.5 items-center mb-4">
        <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
          <FiSearch color="#9F9F9F" className="text-xl" />
          <Input
            type="search"
            value={filter.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search job title or keyword"
            className="font-sans border-0 focus-visible:ring-0 p-0"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-fit !text-2xl !px-5 bg-transparent border border-[#303030] rounded-2xl">
              <MdFilterList size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#272727] border-0 min-w-[300px] font-sans text-white p-4"
            align="end"
          >
            <div className="w-full flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-xl">Filter</h5>
                <Button
                  type="button"
                  onClick={() =>
                    setFilter({
                      country: "",
                      job_type: "",
                      experience: "",
                      location_type: "",
                      search: "",
                    })
                  }
                  className="!p-0 !bg-transparent text-[#D396FB]"
                >
                  Clear all
                </Button>
              </div>

              <div className="w-full flex flex-col gap-y-4">
                <Label htmlFor="country" className="font-medium text-lg">
                  Country
                </Label>
                <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
                  <IoLocationOutline color="#9F9F9F" className="text-xl" />
                  <Input
                    type="search"
                    className="font-sans border-0 focus-visible:ring-0 p-0"
                    value={filter.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <h5 className="font-medium text-lg">Job Type</h5>
                <div className="flex flex-col gap-y-4">
                  <div className="grid grid-cols-2 items-center gap-y-4">
                    {["full-time", "internship", "part-time", "volunteer"].map(
                      (type) => (
                        <div key={type} className="flex items-center gap-3">
                          <Checkbox
                            checked={filter.job_type === type}
                            onCheckedChange={() =>
                              handleFilterChange("job_type", type)
                            }
                            className="data-[state='checked']:bg-white border w-4 h-4 rounded-[2px]"
                          />
                          <div className="grid gap-2">
                            <Label
                              htmlFor="terms-2"
                              className="text-sm text-[#A6A6A6] font-normal"
                            >
                              {type}
                            </Label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <h5 className="font-medium text-lg">Experience Level</h5>
                <div className="flex flex-col gap-y-4">
                  <div className="grid grid-cols-2 gap-y-4 justify-between">
                    {["entry-level", "intermediate", "expert"].map((level) => (
                      <div key={level} className="flex items-center gap-3">
                        <Checkbox
                          checked={filter.experience === level}
                          onCheckedChange={() =>
                            handleFilterChange("experience", level)
                          }
                          className="data-[state='checked']:bg-white border w-4 h-4 rounded-[2px]"
                        />
                        <div className="grid gap-2">
                          <Label
                            htmlFor="terms-2"
                            className="text-sm text-[#A6A6A6] font-normal"
                          >
                            {level}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <h5 className="font-medium text-lg">On-site/remote</h5>
                <div className="flex flex-col gap-y-4">
                  <div className="grid grid-cols-2 gap-y-4 justify-between">
                    {["Onsite", "Remote", "Hybrid"].map((loc) => (
                      <div key={loc} className="flex items-center gap-3">
                        <Checkbox
                          checked={filter.location_type === loc}
                          onCheckedChange={() =>
                            handleFilterChange("location_type", loc)
                          }
                          className="data-[state='checked']:bg-white border w-4 h-4 rounded-[2px]"
                        />
                        <div className="grid gap-2">
                          <Label
                            htmlFor="terms-2"
                            className="text-sm text-[#A6A6A6] font-normal"
                          >
                            {loc}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <>
        {loading && hiringPosts?.length === 0
          ? [...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-[200px] my-4" />
            ))
          : displayedPost?.map((post, index) => {
              return (
                <div
                  key={post.uuid}
                  ref={index === displayedPost.length - 1 ? ref : undefined}
                  className="not-last:mb-5"
                >
                  <HiringCard
                    post={post}
                    removeBookmark={handleDeleteBookmark}
                    isPrivate={false}
                  />
                </div>
              );
            })}

        {loading && hiringPosts?.length > 0 && (
          <Skeleton className="w-full h-[200px] my-4" />
        )}

        {!loading && displayedPost.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No results match your filters.
          </p>
        )}
      </>

      {/* --- BACK-TO-TOP BUTTON (GSAP Scroll, CSS Transition) --- */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          // Added transition-opacity and duration for a simple fade effect
          className="fixed bottom-6 right-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-[#1E1E1E] text-white shadow-lg border border-[#303030] backdrop-blur-md transition-opacity duration-300 hover:opacity-100"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      {/* -------------------------------------------------------- */}
    </div>
  );
};

export default Hiring;
