import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TPost } from "@/utils/types/social/social";
import { Link } from "@tanstack/react-router";

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
      className="flex w-full gap-4 px-3 py-2 hover:bg-gray-900/70"
    >
      <div className="aspect-[3/4] h-min w-[90px] bg-gray-600 rounded-md">
        <img
          src={post.owner.avatar || "/no-image-2.jpg"}
          alt={post.id}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover rounded-md size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold line-clamp-1">
          {post.owner.username}
        </p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            <div className="bg-gray-400 rounded-full size-1" />
          </div>
          <div className="flex items-center gap-[6px]">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
