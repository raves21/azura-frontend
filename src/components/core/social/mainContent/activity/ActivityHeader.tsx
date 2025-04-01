import { cn } from "@/lib/utils";
import { Circle, Users, Globe, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import UserAvatar from "../../UserAvatar";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import {
  LinkProps,
  Navigate,
  useMatchRoute,
  Link,
} from "@tanstack/react-router";
import { TPost, TPostComment } from "@/utils/types/social/social";
import PostOptionsDropdown from "./PostOptionsDropdown";
import { formatToRelativeTime } from "@/services/social/functions/socialFunctions";

type PostProps = {
  type: "post";
  post: TPost;
};

type CommentProps = {
  type: "comment";
  comment: TPostComment;
};

type ActivityHeaderProps = {
  className?: string;
  linkProps: LinkProps;
} & (PostProps | CommentProps);

//2 mins
const FORMAT_TO_RELATIVE_TIME_INTERVAL = 120_000;

export default function ActivityHeader({
  className,
  linkProps,
  ...props
}: ActivityHeaderProps) {
  const avatar =
    props.type === "post"
      ? props.post.owner.avatar
      : props.comment.author.avatar;
  const username =
    props.type === "post"
      ? props.post.owner.username
      : props.comment.author.username;
  const handle =
    props.type === "post"
      ? props.post.owner.handle
      : props.comment.author.handle;
  const createdAt =
    props.type === "post" ? props.post.createdAt : props.comment.createdAt;

  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });
  const [relativeTimeCreated, setRelativeTimeCreated] = useState<string>(
    formatToRelativeTime(createdAt)
  );

  //for changing the formatted relative time of the post's/comment's createdAt every 2 minutes
  useEffect(() => {
    const formattedToRelativeTime = formatToRelativeTime(createdAt);
    let interval: NodeJS.Timeout | undefined = undefined;

    //only do so if the relativeTime was seconds/minutes ago
    if (
      formattedToRelativeTime.includes("second") ||
      formattedToRelativeTime.includes("minute")
    ) {
      interval = setInterval(() => {
        setRelativeTimeCreated(formatToRelativeTime(createdAt));
      }, FORMAT_TO_RELATIVE_TIME_INTERVAL);
    }

    return () => clearInterval(interval);
  }, []);

  const [isPrivacyHovered, setIsPrivacyHovered] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
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
          {isPostInfoPage && props.type === "post" && (
            <>
              <div
                onMouseEnter={() => setIsPrivacyHovered(true)}
                onMouseLeave={() => setIsPrivacyHovered(false)}
                className="relative"
              >
                {props.post.privacy === "FRIENDS_ONLY" && (
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
                {props.post.privacy === "ONLY_ME" && (
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
                {props.post.privacy === "PUBLIC" && (
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
          <p className="text-gray-500">{relativeTimeCreated}</p>
        </div>
      </div>
      {props.type === "post" && props.post.owner.id === currentUser.id && (
        <PostOptionsDropdown post={props.post} />
      )}
    </div>
  );
}
