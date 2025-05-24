import { TPost } from "@/utils/types/social/social";
import { Navigate, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "@/services/auth/authQueries";
import { cn } from "@/lib/utils";
import ActivityContentRenderer from "../activity/ActivityContentRenderer";
import PostActions from "./PostActions";
import PostWithAttachment from "./postContent/PostWithAttachment";
import { ReactNode } from "react";
import PostHeader from "./PostHeader";

type Props = {
  fromState?: "home-page" | "user-page" | "search-page";
  post: TPost;
};

export default function Post({ fromState, post }: Props) {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });

  let postContent: ReactNode;
  if (post.collection) {
    postContent = (
      <PostWithAttachment
        owner={post.owner}
        attachmentType="collection"
        isCollectionAttachmentViewable={post.isCollectionAttachmentViewable}
        collection={post.collection}
        content={post.content}
      />
    );
  } else if (post.media) {
    postContent = (
      <PostWithAttachment
        attachmentType="media"
        media={post.media}
        content={post.content}
      />
    );
  } else {
    postContent = (
      <p
        className={cn(
          "w-full text-gray-300 line-clamp-5 text-sm mobile-m:text-md sm:text-base",
          {
            "sm:pl-14": !isPostInfoPage,
          }
        )}
      >
        <ActivityContentRenderer content={post.content!} />
      </p>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <div
      onClick={() =>
        navigate({
          to: "/social/$userHandle/posts/$postId",
          params: { userHandle: currentUser.handle, postId: post.id },
          state: {
            postInfoState: fromState ? { from: fromState } : undefined,
          },
        })
      }
      className="flex w-full gap-2 text-sm mobile-m:text-base md:gap-4 px-3 mobile-l:p-5 bg-socialPrimary hover:bg-socialPrimaryHover rounded-lg py-4 hover:cursor-pointer"
    >
      <div className="flex flex-col flex-grow gap-3">
        <PostHeader
          post={post}
          linkProps={{
            to: "/social/$userHandle",
            params: { userHandle: currentUser.handle },
          }}
        />
        {postContent}
        <PostActions
          postId={post.id}
          totalComments={post.totalComments}
          totalLikes={post.totalLikes}
          isLikedByCurrentUser={post.isLikedByCurrentUser}
        />
      </div>
    </div>
  );
}
