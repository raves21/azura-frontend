import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TPost } from "@/utils/types/social/social";
import { Link } from "@tanstack/react-router";
import UserAvatar from "../../UserAvatar";
import ActivityContentRenderer from "../../mainContent/activity/ActivityContentRenderer";

type SearchPostsResultCardProps = {
  post: TPost;
};

export default function SearchPostsResultCard({
  post
}: SearchPostsResultCardProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <Link
      to="/social/$userHandle/posts/$postId"
      params={{
        postId: post.id,
        userHandle: post.owner.handle
      }}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-2 py-4 md:px-3 hover:bg-gray-900/70"
    >
      <UserAvatar
        src={post.owner.avatar || "/no-image-2.jpg"}
        imageClassName="size-14"
      />
      <div className="flex flex-col justify-center w-full gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold mobile-l:text-md sm:text-base">
          <p className="line-clamp-1">{post.owner.username}</p>
          <p className="line-clamp-1 text-socialTextSecondary">@{post.owner.handle}</p>
        </div>
        <div className="w-full space-y-3 text-sm text-gray-400 mobile-l:text-md sm:text-base">
          {post.content && (
            <div className="flex items-center gap-[6px]">
              <ActivityContentRenderer content={post.content} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
