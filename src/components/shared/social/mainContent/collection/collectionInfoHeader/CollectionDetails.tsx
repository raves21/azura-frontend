import { Circle } from "lucide-react";
import CollectionOwner from "./CollectionOwner";
import CollectionPrivacy from "./CollectionPrivacy";
import { cn } from "@/lib/utils";

type CollectionNameAndDescriptionProps = {
  name: string;
  description: string;
};

export default function CollectionDetails({
  name,
  description,
}: CollectionNameAndDescriptionProps) {
  let nameStyle = "";
  let descriptionStyle = "";

  const collectionNameArray = name.split(" ");
  if (
    (collectionNameArray.length === 1 && name.length > 8) ||
    collectionNameArray.length >= 3
  ) {
    nameStyle = "text-3xl line-clamp-3";
    descriptionStyle = "line-clamp-2";
  } else {
    nameStyle = "text-5xl line-clamp-1";
    descriptionStyle = "line-clamp-3";
  }

  return (
    <div className="flex flex-col gap-5">
      <p className={cn("font-bold", nameStyle)}>{name}</p>
      <div className="flex items-center gap-3">
        <CollectionOwner />
        <Circle className="size-[6px] stroke-none fill-socialTextSecondary" />
        <CollectionPrivacy privacy="PUBLIC" />
      </div>
      <p className={cn("text-sm text-socialTextSecondary", descriptionStyle)}>
        {description ? description : "No description"}
      </p>
    </div>
  );
}
