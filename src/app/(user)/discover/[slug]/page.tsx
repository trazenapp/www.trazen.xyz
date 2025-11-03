"use client";
import React, { use, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  discoverPost,
  resetDiscoverPosts,
  setQuery,
} from "@/src/redux/slices/discoverPostSlice";
import { PostItem } from "@/src/types/post.types";
import { Loader2 } from "lucide-react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: posts,
    loading,
    hasMore,
    page,
    limit,
    query,
  } = useAppSelector((state) => state.discoverPost);

  const observerTarget = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const pendingRequest = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      dispatch(resetDiscoverPosts());
      if (slug) {
        dispatch(setQuery(slug.toLowerCase()));
      }
      dispatch(discoverPost({ page: 1, limit, query: slug.toLowerCase() }));
    }
  }, []);

  useEffect(() => {
    if (slug.toLowerCase() !== query && isInitialized.current) {
      dispatch(resetDiscoverPosts());
      dispatch(setQuery(slug.toLowerCase()));
      dispatch(discoverPost({ page: 1, limit, query: slug.toLowerCase() }));
    }
  }, [slug.toLowerCase()]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !loading &&
        !pendingRequest.current &&
        posts.length > 0
      ) {
        pendingRequest.current = true;
        dispatch(discoverPost({ page, limit, query })).finally(() => {
          pendingRequest.current = false;
        });
      }
    },
    [dispatch, page, limit, query, hasMore, loading, posts.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleIntersection]);

  return (
    <div>
      {" "}
      <div className="w-full flex items-center gap-x-6 font-sans mb-4">
        <Button onClick={router.back} className="border-0 bg-transparent">
          <FaArrowLeft />
        </Button>
        <div className="flex gap-x-2.5">
          <p className="text-[#f4f4f4] text-xl font-medium capitalize hidden md:flex lg:flex">
            {slug}
          </p>
        </div>
      </div>
      <div>
        {posts.length === 0 && !loading && (
          <p className="text-center text-[#f4f4f4] py-4">
            No posts found for "{slug}"
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: PostItem, index) => (
          <Link
            href={`/profile/${post.project_uuid}`}
            key={post.project_uuid! + index * 5}
            className="border border-[#303030] py-3 px-4 rounded-[12px] w-full flex items-center gap-x-4 text-base text-[#f4f4f4] font-medium font-sans"
          >
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <Image
                src={`${post.project?.avatar}`}
                alt="avatar image"
                quality={100}
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="text-[#f4f4f4] text-base font-medium">
              {post.project?.name}
            </p>
          </Link>
        ))}
      </div>
      <div ref={observerTarget} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more posts...</span>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-muted-foreground">No more posts to load</p>
        )}
      </div>
    </div>
  );
};

export default page;
