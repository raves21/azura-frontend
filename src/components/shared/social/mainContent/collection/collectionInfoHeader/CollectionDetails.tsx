import { Circle } from "lucide-react";
import CollectionOwner from "./CollectionOwner";
import CollectionPrivacy from "./CollectionPrivacy";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";

type CollectionNameAndDescriptionProps = {
  name: string;
  description: string;
  owner: EntityOwner;
  privacy: EntityPrivacy;
};

export default function CollectionDetails({
  name,
  description,
  owner,
  privacy,
}: CollectionNameAndDescriptionProps) {
  return (
    <div className="flex flex-col items-center gap-5 sm:items-start">
      <p className="text-xl font-bold text-center 570:px-12 sm:px-0 lg:text-3xl sm:text-start mobile-m:text-2xl line-clamp-3">
        {name}
      </p>
      <div className="flex items-center gap-3">
        <CollectionOwner
          avatar={owner.avatar || "/no-image-2.jpg"}
          userName={owner.username}
        />
        <Circle className="size-[6px] stroke-none fill-socialTextSecondary" />
        <CollectionPrivacy privacy={privacy} />
      </div>
      <p className="text-sm text-socialTextSecondary line-clamp-4 sm:line-clamp-3">
        {description ? description : "No description"}
      </p>
    </div>
  );
}
