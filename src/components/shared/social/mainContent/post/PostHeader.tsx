import { Ellipsis } from "lucide-react";

export default function PostHeader() {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-col gap-2">
        <div className="flex items-center gap-3">
          <p className="font-semibold">Elon Musk</p>
          <p className="text-gray-500">@elonmusk</p>
        </div>
        <p className="text-gray-500">2 hours ago</p>
      </div>
      <button>
        <Ellipsis className="size-5 stroke-gray-500" />
      </button>
    </div>
  );
}
