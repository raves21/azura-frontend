import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type CollectionInfoHeaderProps = {
  userName: string;
  collectionInfoName: string;
};

export default function CollectionInfoHeader({
  userName,
  collectionInfoName,
}: CollectionInfoHeaderProps) {
  return (
    <div className="flex items-center gap-5 mt-2">
      <Link
        to="/social/profile/$userName/collections"
        params={{
          userName,
        }}
        className="relative group"
      >
        <ArrowLeft className="transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
        <div className="bg-gray-700/20 size-[150%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Link>
      <p className="text-lg font-medium">{collectionInfoName}</p>
    </div>
  );
}
