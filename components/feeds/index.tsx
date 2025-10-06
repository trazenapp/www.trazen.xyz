"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Feedscard from "@/components/feedsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPublicPosts, fetchPrivatePosts } from "@/redux/slices/postSlice";

interface FeedsProps {
  isPrivate: boolean;
}

const Feeds = ({ isPrivate = false }: FeedsProps) => {
  const dispatch = useAppDispatch();
  const { publicPosts, privatePosts, loading, pagination, hasMore } =
    useAppSelector((state) => state.post);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            fetchPublicPosts({
              search: "",
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
    dispatch(fetchPublicPosts({ search: "", page: 1, limit: 10 }));
    dispatch(fetchPrivatePosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <>
      {loading
        ? privatePosts.map((post) => (
            <Skeleton key={post.uuid} className="w-full h-[200px] my-4" />
          ))
        : isPrivate
          ? publicPosts.map((post) => (
              <Feedscard
                key={post.uuid}
                uuid={post.uuid as string}
                content={post.content}
                medias={post.medias}
                createdAt={post.createdAt}
                upvoteCount={post.upvoteCount}
                downvoteCount={post.downvoteCount}
                commentCount={post.commentCount}
                name={post.project?.name}
                avatar={post.project?.avatar}
                is_approved={post.project?.is_approved}
                project_uuid={post.project_uuid}
              />
            ))
          : publicPosts.map((post) => (
              <Feedscard
                key={post.uuid}
                uuid={post.uuid as string}
                content={post.content}
                medias={post.medias}
                createdAt={post.createdAt}
                upvoteCount={post.upvoteCount}
                downvoteCount={post.downvoteCount}
                commentCount={post.commentCount}
                name={post.project?.name}
                avatar={post.project?.avatar}
                is_approved={post.project?.is_approved}
                project_uuid={post.project_uuid}
              />
            ))}
    </>
  );
};

export default Feeds;
