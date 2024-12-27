import { cn } from "@/lib/utils";
import { EntityOwner, EntityPrivacy } from "@/utils/types/social/shared";
import { Circle, Ellipsis, Users, Globe, Lock } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../../UserAvatar";
import { useAuthStore } from "@/utils/stores/authStore";
import { Navigate } from "@tanstack/react-router";

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
  className?: string;
} & (WithPostPrivacyProps | WithoutPostPrivacyProps);

export default function ActivityHeader({
  showPrivacy,
  owner,
  createdAt,
  className,
  ...props
}: PostHeaderProps) {
  const withPostPrivacyProps = showPrivacy
    ? (props as WithPostPrivacyProps)
    : null;

  const [isPrivacyHovered, setIsPrivacyHovered] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      className={cn(
        "flex items-start w-full text-sm sm:text-base gap-2 sm:gap-3",
        className
      )}
    >
      <UserAvatar
        src={owner.avatar}
        imageClassName="mobile-m:size-10 sm:size-11"
      />
      <div className="flex flex-col mr-auto">
        <div className="flex items-center gap-2 mobile-l:gap-3">
          <p className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-[130px] mobile-m:max-w-[150px] mobile-l:max-w-[200px] sm:max-w-[380px] md:max-w-[250px] lg:max-w-[380px]">
            {owner.username}
          </p>
          <p className="text-gray-500">@{owner.handle}</p>
        </div>
        <div className="flex items-center gap-[6px] mobile-m:gap-2 mobile-m:mt-1">
          {withPostPrivacyProps && (
            <>
              <div
                onMouseEnter={() => setIsPrivacyHovered(true)}
                onMouseLeave={() => setIsPrivacyHovered(false)}
                className="relative"
              >
                {withPostPrivacyProps.privacy === "FRIENDS_ONLY" && (
                  <>
                    <Users className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary" />
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
                    <Lock className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary" />
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
                    <Globe className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary" />
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

          <p className="text-gray-500">2 hours ago</p>
        </div>
      </div>
      {owner.id === currentUser.id && (
        <button>
          <Ellipsis className="size-6 stroke-gray-500" />
        </button>
      )}
    </div>
  );
}
