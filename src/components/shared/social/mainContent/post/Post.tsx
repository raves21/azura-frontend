import { cn } from "@/lib/utils";
import PostActions from "./PostActions";
import PostWithoutAttachment from "./postContent/PostWithoutAttachment";
import PostHeader from "./PostHeader";
import { useNavigate } from "@tanstack/react-router";
import { TPost } from "@/utils/types/social/social";
import PostWithAttachment from "./postContent/PostWithAttachment";

type PostProps = {
  className?: string;
  fromState?: "home-page" | "user-page" | "search-page";
  post: TPost;
};

export default function Post({ className, fromState, post }: PostProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate({
          to: "/social/$userName/post/$postId",
          params: {
            userName: post.owner.handle,
            postId: post.id,
          },
          state: {
            postInfoState: fromState
              ? {
                  from: fromState,
                }
              : undefined,
          },
        });
      }}
      className={cn(
        "flex w-full gap-4 p-5 rounded-lg hover:cursor-pointer bg-socialPrimary hover:bg-socialPrimaryHover",
        className
      )}
    >
      <img
        src="/sample-user-pfp.png"
        className="block object-cover rounded-full size-11"
      />
      <div className="flex flex-col flex-grow gap-3">
        <PostHeader
          owner={post.owner}
          createdAt={post.createdAt}
          showPrivacy={false}
        />
        {post.collection ? (
          <PostWithAttachment
            attachmentType="collection"
            collection={post.collection}
            content={post.content}
          />
        ) : post.media ? (
          <PostWithAttachment
            attachmentType="media"
            media={post.media}
            content={post.content}
          />
        ) : (
          <PostWithoutAttachment content={post.content} />
        )}
        <PostActions />
      </div>
    </div>
  );
}
