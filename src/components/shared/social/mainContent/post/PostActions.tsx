import { Heart, MessageCircle, Circle } from "lucide-react";

export default function PostActions() {
  return (
    <div className="flex items-center w-full gap-5 mt-2 text-gray-500">
      <button className="flex items-center gap-2 group">
        <div className="relative">
          <Heart className="size-5 stroke-gray-500 group-hover:stroke-red-500" />
          <Circle className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 stroke-none fill-red-500/10 size-10 top-1/2 left-1/2" />
        </div>
        <p className="group-hover:text-red-500">14k</p>
      </button>
      <button className="flex items-center gap-2 group">
        <div className="relative">
          <MessageCircle className="size-5 stroke-gray-500 group-hover:stroke-blue-500" />
          <Circle className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 stroke-none fill-blue-500/10 size-10 top-1/2 left-1/2" />
        </div>
        <p className="group-hover:text-blue-500">11k</p>
      </button>
    </div>
  );
}
