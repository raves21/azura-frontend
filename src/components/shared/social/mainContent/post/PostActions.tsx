import { cn } from "@/lib/utils";
import { useMatchRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Circle } from "lucide-react";
import { useState } from "react";

type PostActionsProps = {
  className?: string;
  iconClassName?: string;
};

export default function PostActions({
  className,
  iconClassName,
}: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const matchRoute = useMatchRoute();

  return (
    <div
      className={cn(
        "flex items-center w-full gap-5 mt-2 text-gray-500",
        { "sm:pl-14": !matchRoute({ to: "/social/$userName/post/$postId" }) },
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
        <p className="group-hover:text-blue-500">11k</p>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="flex items-center gap-2 group"
      >
        <div className="relative">
          <Heart
            className={cn(
              "size-5 stroke-gray-500 group-hover:stroke-red-500",
              {
                "fill-red-500 stroke-red-500": liked,
              },
              iconClassName
            )}
          />
          <Circle className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 stroke-none fill-red-500/10 size-10 top-1/2 left-1/2" />
        </div>
        <p className="group-hover:text-red-500">14k</p>
      </button>
    </div>
  );
}
