import { EntityPrivacy } from "@/utils/types/social/shared";
import { Users, Globe, Lock } from "lucide-react";

type Props = {
  privacy: EntityPrivacy;
};

export default function CollectionPrivacy({ privacy }: Props) {
  return (
    <div className="flex items-center gap-[6px]">
      {privacy === "FRIENDS_ONLY" && (
        <Users className="size-4 stroke-3 stroke-socialTextSecondary" />
      )}
      {privacy === "ONLY_ME" && (
        <Lock className="size-4 stroke-3 stroke-socialTextSecondary" />
      )}
      {privacy === "PUBLIC" && (
        <Globe className="size-4 stroke-3 stroke-socialTextSecondary" />
      )}
      <p className="font-medium text-socialTextSecondary">
        {privacy === "FRIENDS_ONLY"
          ? "Friends only"
          : privacy === "ONLY_ME"
            ? "Only me"
            : "Public"}
      </p>
    </div>
  );
}
