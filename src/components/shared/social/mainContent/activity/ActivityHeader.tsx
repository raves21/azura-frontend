import { cn } from "@/lib/utils";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";
import { Circle, Ellipsis, Users, Globe, Lock } from "lucide-react";
import { useState } from "react";

type WithPostPrivacyProps = {
  showPrivacy: true;
  privacy: EntityPrivacy;
};

type WithoutPostPrivacyProps = {
  showPrivacy: false;
  privacy: undefined;
};

type PostHeaderProps = {
  owner: EntityOwner;
  createdAt: Date;
} & (WithPostPrivacyProps | WithoutPostPrivacyProps);

export default function ActivityHeader({
  showPrivacy,
  owner,
  createdAt,
  ...props
}: PostHeaderProps) {
  const withPostPrivacyProps = showPrivacy
    ? (props as WithPostPrivacyProps)
    : null;

  const [isPrivacyHovered, setIsPrivacyHovered] = useState(false);

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex-col">
        <div className="flex items-center gap-3">
          <p className="font-semibold">{owner.username}</p>
          <p className="text-gray-500">@{owner.handle}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {withPostPrivacyProps && (
            <>
              <div
                onMouseEnter={() => setIsPrivacyHovered(true)}
                onMouseLeave={() => setIsPrivacyHovered(false)}
                className="relative"
              >
                {withPostPrivacyProps.privacy === "FRIENDS_ONLY" && (
                  <>
                    <Users className="size-4 stroke-socialTextSecondary" />
                    <p
                      className={cn(
                        "absolute -top-6 -right-12 transition-opacity text-darkBg p-2 font-medium rounded-full text-xs bg-gray-400 opacity-0",
                        {
                          "opacity-90": isPrivacyHovered,
                        }
                      )}
                    >
                      Friends
                    </p>
                  </>
                )}
                {withPostPrivacyProps.privacy === "ONLY_ME" && (
                  <>
                    <Lock className="size-4 stroke-socialTextSecondary" />
                    <p
                      className={cn(
                        "absolute -top-6 -right-12 transition-opacity text-darkBg p-2 font-medium rounded-full text-xs bg-gray-400 opacity-0",
                        {
                          "opacity-90": isPrivacyHovered,
                        }
                      )}
                    >
                      Only Me
                    </p>
                  </>
                )}
                {withPostPrivacyProps.privacy === "PUBLIC" && (
                  <>
                    <Globe className="size-4 stroke-socialTextSecondary" />
                    <p
                      className={cn(
                        "absolute -top-6 -right-12 transition-opacity text-darkBg p-2 font-medium rounded-full text-xs bg-gray-400 opacity-0",
                        {
                          "opacity-90": isPrivacyHovered,
                        }
                      )}
                    >
                      Public
                    </p>
                  </>
                )}
              </div>
              <Circle className="stroke-none fill-socialTextSecondary size-1" />
            </>
          )}

          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>
      {owner.handle === "rikitiu" && (
        <button>
          <Ellipsis className="size-6 stroke-gray-500" />
        </button>
      )}
    </div>
  );
}
