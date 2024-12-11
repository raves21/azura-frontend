import { TPost } from "@/utils/types/social/social";
import PostActions from "../PostActions";
import PostLikers from "./PostLikers";
import PostWithAttachment from "../postContent/PostWithAttachment";
import ActivityHeader from "../../activity/ActivityHeader";

type PostInfoProps = {
  post: TPost;
};

export default function PostInfo({ post }: PostInfoProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full gap-4">
        <ActivityHeader
          createdAt={post.createdAt}
          owner={post.owner}
          showPrivacy
          privacy={post.privacy}
          className="gap-[10px]"
        />
      </div>
      <div className="my-1">
        {post.collection ? (
          <PostWithAttachment
            owner={post.owner}
            attachmentType="collection"
            collection={post.collection}
            content={post.content}
            contentClassName="text-sm mobile-m:text-base"
          />
        ) : post.media ? (
          <PostWithAttachment
            attachmentType="media"
            media={post.media}
            content={post.content}
            contentClassName="text-sm mobile-m:text-base"
          />
        ) : (
          <p className="w-full text-sm text-gray-300 mobile-m:text-base">
            {post.content}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-1 mobile-m:mt-2">
        <PostLikers />
        <PostActions className="text-sm" iconClassName="size-5" />
      </div>
    </div>
  );
}
