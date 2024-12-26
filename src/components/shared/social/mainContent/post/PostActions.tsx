import { cn } from "@/lib/utils";
import { useLikePost, useUnLikePost } from "@/services/auth/socialQueries";
import {
  likePostCacheMutation,
  unlikePostCacheMutation,
} from "@/utils/functions/reusable_functions";
import { useMatchRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Circle } from "lucide-react";

type PostActionsProps = {
  className?: string;
  iconClassName?: string;
  totalComments: number;
  totalLikes: number;
  isLikedByCurrentUser: boolean;
  postId: string;
};

export default function PostActions({
  className,
  iconClassName,
  totalComments,
  totalLikes,
  isLikedByCurrentUser,
  postId,
}: PostActionsProps) {
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({ to: "/social/$userName/post/$postId" });

  //TODO: add debounce
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnLikePost();

  return (
    <div
      className={cn(
        "flex items-center w-full gap-6 mt-2 text-gray-500",
        { "sm:pl-14": !isPostInfoPage },
        className
      )}
    >
      <button className="flex items-center gap-2 group">
        <div className="relative">
          <MessageCircle
            className={cn(
              "size-5 stroke-gray-500 group-hover:stroke-blue-500",
              iconClassName
            )}
          />
          <Circle className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 stroke-none fill-blue-500/10 size-10 top-1/2 left-1/2" />
        </div>
        {!!totalComments && (
          <p className="group-hover:text-blue-500">{totalComments}</p>
        )}
      </button>
      <button
        onClick={async (e) => {
          e.stopPropagation();
          if (isLikedByCurrentUser) {
            await unlikePostCacheMutation(postId);
            await unlikePost(postId);
          } else {
            await likePostCacheMutation(postId);
            await likePost(postId);
          }
        }}
        className="flex items-center gap-2 group"
      >
        <div className="relative">
          <Heart
            className={cn(
              "size-5 stroke-gray-500 group-hover:stroke-red-500",
              {
                "fill-red-500 stroke-red-500": isLikedByCurrentUser,
              },
              iconClassName
            )}
          />
          <Circle className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 stroke-none fill-red-500/10 size-10 top-1/2 left-1/2" />
        </div>
        {!!totalLikes && (
          <p className="group-hover:text-red-500">{totalLikes}</p>
        )}
      </button>
    </div>
  );
}
