import { Ellipsis, Forward } from "lucide-react";

export default function CollectionActions() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <button>
          <Ellipsis className="size-6 fill-mainWhite" />
        </button>
        <button className="flex items-center gap-2 group">
          <Forward className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          <p className="transition-colors text-mainWhite group-hover:text-mainAccent">
            Share
          </p>
        </button>
      </div>
      <div className="w-full mt-4 h-[0.5px] bg-socialTextSecondary/40" />
    </div>
  );
}
