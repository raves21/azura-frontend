import { EntityOwner } from "@/utils/types/social/shared";
import { Ellipsis } from "lucide-react";

type PostCommentHeaderProps = {
  author: EntityOwner;
  createdAt: Date;
};

export default function PostCommentHeader({ author }: PostCommentHeaderProps) {
  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex-col">
        <div className="flex items-center gap-3">
          <p className="font-semibold">{author.username}</p>
          <p className="text-gray-500">{author.handle}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">2 hours ago</p>
      </div>
      <button>
        <Ellipsis className="size-6 stroke-gray-500" />
      </button>
    </div>
  );
}
