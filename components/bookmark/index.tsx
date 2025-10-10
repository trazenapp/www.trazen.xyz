"use client"
import React, { useEffect } from 'react'
import BookmarkCard from '../bookmarkCard'
import Feedscard from "@/components/feedsCard";
import HiringCard from "@/components/hiringCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchBookmark } from "@/redux/slices/bookmarkSlice";
import { fetchPublicPosts } from "@/redux/slices/postSlice";
import { fetchPublicHiring } from "@/redux/slices/hiringSlice"

const Bookmark = () => {
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const { publicPosts } = useAppSelector((state) => state.post);
  const { hiringPosts } = useAppSelector((state) => state.hiring);
  // const {  } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  console.log(bookmark, publicPosts, hiringPosts);
  useEffect(() => {
    const getBookmark = async () => {
      try {
        await dispatch(fetchBookmark()).unwrap();
        await dispatch(fetchPublicPosts({ search: "", page: 1, limit: 10 })).unwrap();
        await dispatch(fetchPublicHiring()).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getBookmark();
  }, [dispatch]);

//   {
//     "id": 5,
//     "uuid": "20c4882f-b6f8-4fce-ae54-00d0e834e6d3",
//     "user_uuid": "310a575a-a6a2-477a-8c36-b62558824202",
//     "post_uuid": "73033a01-9090-4d4e-97ba-0d533e66b3a0",
//     "event_uuid": null,
//     "hire_uuid": null,
//     "task_uuid": null,
//     "created_at": "2025-10-08T14:29:33.165Z",
//     "updated_at": "2025-10-08T14:29:33.165Z"
// }

  return (
    <div>
      {bookmark.map((bookmark) => {
        if (bookmark && (bookmark as any).post_uuid) {
          const post = publicPosts.find((post) => post.uuid === (bookmark as any).post_uuid);
          if (post) {
            return <Feedscard
                key={post.uuid}
                uuid={post.uuid as string}
                content={post.content}
                medias={post.medias}
                createdAt={post.created_at}
                upvoteCount={post.upvoteCount}
                downvoteCount={post.downvoteCount}
                commentCount={post.commentCount}
                name={post.project?.name}
                avatar={post.project?.avatar}
                is_approved={post.project?.is_approved}
                project_uuid={post.project_uuid}
              />
          }
        } else if ((bookmark as any).hire_uuid) {
          const hire = hiringPosts.find((hire) => hire.uuid === (bookmark as any).hire_uuid);
          if (hire) {
            return <HiringCard key={hire.id} post={hire} bookmark={bookmark} />
          }
        }
      })}
    </div>
  )
}

export default Bookmark