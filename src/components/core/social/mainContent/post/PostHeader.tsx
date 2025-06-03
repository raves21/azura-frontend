import { cn } from "@/lib/utils";
import { Users, Globe, Circle, Lock } from "lucide-react";
import UserAvatar from "../../shared/UserAvatar";
import PostOptionsDropdown from "./PostOptionsDropdown";
import { LinkProps, Navigate, useMatchRoute } from "@tanstack/react-router";
import { TPost } from "@/utils/types/social/social";
import { Link } from "@tanstack/react-router";
import { useFormatToRelativeTimeOnInterval } from "@/utils/hooks/useFormatToRelativeTimeOnInterval";
import { useState } from "react";
import { useCurrentUser } from "@/services/auth/api/queries";

type Props = {
  className?: string;
  linkProps: LinkProps;
  post: TPost;
};

export default function PostHeader({ className, post, linkProps }: Props) {
  const avatar = post.owner.avatar;
  const username = post.owner.username;
  const handle = post.owner.handle;
  const createdAt = post.createdAt;

  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });

  const { timeAgo: createdAtRelativeTime } =
    useFormatToRelativeTimeOnInterval(createdAt);

  const [isPrivacyHovered, setIsPrivacyHovered] = useState(false);

  const { data: currentUser } = useCurrentUser();
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      className={cn(
        "flex w-full text-sm sm:text-base gap-2 sm:gap-3",
        className
      )}
    >
      <UserAvatar
        linkProps={linkProps}
        src={avatar}
        imageClassName="mobile-m:size-10 sm:size-11"
      />
      <div className="flex flex-col mr-auto">
        <div className="flex items-center gap-2 mobile-l:gap-3">
          <Link
            onClick={(e) => e.stopPropagation()}
            to="/social/$userHandle"
            params={{
              userHandle: handle,
            }}
            className="font-semibold hover:underline hover:decoration-[0.5px] hover:underline-offset-4 hover:decoration-mainWhite text-ellipsis whitespace-nowrap overflow-hidden max-w-[130px] mobile-m:max-w-[150px] mobile-l:max-w-[200px] sm:max-w-[380px] md:max-w-[250px] lg:max-w-[380px]"
          >
            {username}
          </Link>
          <p className="text-gray-500">@{handle}</p>
        </div>
        <div className="flex items-center gap-[6px] mobile-m:gap-2 mobile-m:mt-1 sm:mt-0">
          {isPostInfoPage && (
            <>
              <div className="relative">
                {post.privacy === "FRIENDS_ONLY" && (
                  <>
                    <Users
                      onMouseEnter={() => setIsPrivacyHovered(true)}
                      onMouseLeave={() => setIsPrivacyHovered(false)}
                      className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary"
                    />
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
                {post.privacy === "ONLY_ME" && (
                  <>
                    <Lock
                      onMouseEnter={() => setIsPrivacyHovered(true)}
                      onMouseLeave={() => setIsPrivacyHovered(false)}
                      className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary"
                    />
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
                {post.privacy === "PUBLIC" && (
                  <>
                    <Globe
                      onMouseEnter={() => setIsPrivacyHovered(true)}
                      onMouseLeave={() => setIsPrivacyHovered(false)}
                      className="size-[14px] mobile-m:size-4 stroke-socialTextSecondary"
                    />
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
          <p className="text-gray-500">{createdAtRelativeTime}</p>
        </div>
      </div>
      {post.owner.id === currentUser.id && <PostOptionsDropdown post={post} />}
    </div>
  );
}
