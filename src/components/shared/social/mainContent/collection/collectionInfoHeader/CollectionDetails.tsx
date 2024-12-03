import { Circle } from "lucide-react";
import CollectionOwner from "./CollectionOwner";
import CollectionPrivacy from "./CollectionPrivacy";

type CollectionNameAndDescriptionProps = {
  name: string;
  description: string;
};

export default function CollectionDetails({
  name,
  description,
}: CollectionNameAndDescriptionProps) {
  return (
    <div className="space-y-5">
      <p className="text-4xl font-bold line-clamp-2">{name}</p>
      <div className="flex items-center gap-3">
        <CollectionOwner />
        <Circle className="size-[6px] stroke-none fill-socialTextSecondary" />
        <CollectionPrivacy privacy="PUBLIC" />
      </div>
      <p className="text-sm text-socialTextSecondary line-clamp-3">
        {description ? description : "No description"}
      </p>
    </div>
  );
}
