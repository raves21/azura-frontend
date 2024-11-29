import { Heart, MessageCircle } from "lucide-react";

export default function PostActions() {
  return (
    <div className="flex items-center w-full gap-5 mt-2 text-gray-500">
      <button className="flex items-center gap-2 group">
        <Heart className="size-4 stroke-gray-500 group-hover:stroke-red-500" />
        <p className="group-hover:text-red-500">14k</p>
      </button>
      <button className="flex items-center gap-2 group">
        <MessageCircle className="size-4 stroke-gray-500 group-hover:stroke-blue-500" />
        <p className="group-hover:text-blue-500">11k</p>
      </button>
    </div>
  );
}
