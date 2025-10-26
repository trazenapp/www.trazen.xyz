"use client";
import React, { useEffect, useState } from "react";
import BookmarkCard from "../bookmarkCard";
import Feedscard from "@/components/feedsCard";
import HiringCard from "@/components/hiringCard";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchBookmark, deleteBookmark } from "@/redux/slices/bookmarkSlice";
import { fetchPublicPosts } from "@/redux/slices/postSlice";
import { fetchPublicHiring } from "@/redux/slices/hiringSlice";
import { useInView } from "react-intersection-observer";

const LoadingSkeleton = React.memo(() => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-full h-[200px] my-4" />
      ))}
    </>
  );
});

const Bookmark = () => {
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const {
    publicPosts,
    loading: postLoading,
    pagination: postPagination,
    hasMore: postHasMore,
  } = useAppSelector((state) => state.post);
  const {
    events,
    loading: eventLoading,
    pagination: eventPagination,
    hasMore: eventHasMore,
  } = useAppSelector((state: RootState) => state.events);
  const {
    hiringPosts,
    loading: hiringLoading,
    pagination: hiringPagination,
    hasMore: hiringHasMore,
  } = useAppSelector((state: RootState) => state.hiring);
  const {
    bountyData,
    loading: bountyLoading,
    pagination: bountyPagination,
    hasMore: bountyHasMore,
  } = useAppSelector((state: RootState) => state.bounties);
  // const {  } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState({
    feed: 1,
    events: 1,
    hiring: 1,
    bounties: 1,
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        dispatch(fetchBookmark()).unwrap(),
        dispatch(fetchPublicPosts({ search: "", page: 1, limit: 10 })).unwrap(),
        dispatch(
          fetchPublicHiring({ page: 1, limit: 10 })
        ).unwrap(),
      ]);
    } catch (err: any) {
      console.log("Error fetching initial data:", err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [dispatch]);

  // console.log(bookmark, publicPosts, hiringPosts);

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


  return (
    <div className="grid grid-cols-1 gap-y-5">
      {bookmark.map((bookmark) => {
        if (bookmark && (bookmark as any).post_uuid) {
          const post = publicPosts.find(
            (post) => post.uuid === (bookmark as any).post_uuid
          );
          if (post) {
            return (
              <Feedscard
                post={post}
                removeBookmark={() =>
                  handleDeleteBookmark((bookmark as any).uuid || "")
                }
              />
            );
          }
        } else if ((bookmark as any).hire_uuid) {
          const hire = hiringPosts.find(
            (hire) => hire.uuid === (bookmark as any).hire_uuid
          );
          if (hire) {
            return (
              <HiringCard
                key={hire.uuid}
                post={hire}
                removeBookmark={() =>
                  handleDeleteBookmark((bookmark as any).uuid || "")
                }
              />
            );
          }
        }
      })}
    </div>
  );
};

export default Bookmark;
