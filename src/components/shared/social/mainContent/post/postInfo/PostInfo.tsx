import { TPost } from "@/utils/types/social/social";
import PostActions from "../PostActions";
import PostWithoutAttachment from "../postContent/PostWithoutAttachment";
import PostHeader from "../PostHeader";
import PostLikers from "./PostLikers";
import PostWithAttachment from "../postContent/PostWithAttachment";

type PostInfoProps = {
  post: TPost;
};

export default function PostInfo({ post }: PostInfoProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full gap-4">
        <img
          src="/sample-user-pfp.png"
          className="block object-cover rounded-full size-12"
        />
        <PostHeader
          createdAt={post.createdAt}
          owner={post.owner}
          showPrivacy
          privacy={post.privacy}
        />
      </div>
      <div className="my-1">
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
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <PostLikers />
        <PostActions iconClassName="size-6" />
      </div>
    </div>
  );
}
