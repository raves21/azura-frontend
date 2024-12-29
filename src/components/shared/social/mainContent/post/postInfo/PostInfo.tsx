import { TPostInfo } from "@/utils/types/social/social";
import PostActions from "../PostActions";
import PostLikers from "./PostLikers";
import PostWithAttachment from "../postContent/PostWithAttachment";
import ActivityHeader from "../../activity/ActivityHeader";
import { useParams } from "@tanstack/react-router";

type PostInfoProps = {
  post: TPostInfo;
};

export default function PostInfo({ post }: PostInfoProps) {
  const { userHandle } = useParams({
    from: "/_protected/social/$userHandle/posts/$postId/",
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full gap-4">
        <ActivityHeader
          type="post"
          post={post}
          linkProps={{
            to: "/social/$userHandle",
            params: {
              userHandle,
            },
          }}
        />
      </div>
      <div className="my-1">
        {post.collection ? (
          <PostWithAttachment
            owner={post.owner}
            attachmentType="collection"
            collection={post.collection}
            content={post.content}
            contentClassName="text-sm mobile-m:text-md"
          />
        ) : post.media ? (
          <PostWithAttachment
            attachmentType="media"
            media={post.media}
            content={post.content}
            contentClassName="text-sm mobile-m:text-md"
          />
        ) : (
          <p className="w-full text-sm text-gray-300 mobile-m:text-md sm:text-base">
            {post.content}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-1 mobile-m:mt-2">
        {post.postFirstLikers && (
          <PostLikers
            postFirstLikers={post.postFirstLikers}
            totalLikes={post.totalLikes}
          />
        )}
        <PostActions
          postId={post.id}
          className="text-sm"
          iconClassName="size-5"
          isLikedByCurrentUser={post.isLikedByCurrentUser}
          totalComments={post.totalComments}
          totalLikes={post.totalLikes}
        />
      </div>
    </div>
  );
}
