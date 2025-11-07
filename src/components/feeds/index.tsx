"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useInView } from "react-intersection-observer";
import Feedscard from "@/src/components/feedsCard";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  fetchPublicPosts,
  fetchFollowedPosts,
} from "@/src/redux/slices/postSlice";
import { deleteBookmark } from "@/src/redux/slices/bookmarkSlice";

interface FeedsProps {
  isPrivate: boolean;
}

const Feeds = ({ isPrivate = false }: FeedsProps) => {
  const dispatch = useAppDispatch();
  const { publicPosts, followedPosts, loading, pagination, hasMore } =
    useAppSelector((state) => state.post);

  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

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

  useEffect(() => {
    setPage(1);
    if (isPrivate) {
      dispatch(fetchFollowedPosts({ search: "", page: 1, limit: 10 }));
    } else {
      dispatch(fetchPublicPosts({ search: "", page: 1, limit: 10 }));
    }
  }, [dispatch, isPrivate]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev: number) => {
        const nextPage = prev + 1;
        if (isPrivate) {
          dispatch(
            fetchFollowedPosts({
              search: "",
              page: nextPage,
              limit: pagination.limit,
            })
          );
        } else {
          dispatch(
            fetchPublicPosts({
              search: "",
              page: nextPage,
              limit: pagination.limit,
            })
          );
        }
        return nextPage;
      });
    }
  }, [inView, hasMore, dispatch, page, pagination.limit, loading, isPrivate]);

  const posts = isPrivate ? followedPosts : publicPosts;

  return (
    <>
      {loading && posts.length === 0
        ? [...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[200px] my-4" />
          ))
        : posts.map((post, index) => (
            <div
              key={post.uuid}
              ref={index === posts.length - 1 ? ref : undefined}
            >
              <Feedscard post={post} removeBookmark={handleDeleteBookmark} />
            </div>
          ))}

      {loading && posts.length > 0 && (
        <Skeleton className="w-full h-[200px] my-4" />
      )}
    </>
  );
};

export default Feeds;
