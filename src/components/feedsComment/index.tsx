import React from "react";
import { PostItem } from "@/src/types/post.types";
import FeedsCommentForm from "../feedsCommentForm";

interface FeedsCommmentProps {
  uuid?: string;
  post?: PostItem;
}

const FeedsComment = ({
  uuid,
  post,
}: FeedsCommmentProps) => { 

  return (
    <>
      <FeedsCommentForm
        postUuid={uuid}
        postAuthor={post?.avatar}
        placeholder="Write a comment..."
      />
    </>
  );
};

export default FeedsComment;
