import { cn } from "@/lib/utils";
import { LinkProps, Navigate } from "@tanstack/react-router";
import { TPostComment } from "@/utils/types/social/social";
import { Link } from "@tanstack/react-router";
import { useFormatToRelativeTimeOnInterval } from "@/utils/hooks/useFormatToRelativeTimeOnInterval";
import { useCurrentUser } from "@/services/auth/authQueries";
import UserAvatar from "@/components/core/social/shared/UserAvatar";
import PostCommentOptionsDropdown from "./PostCommentOptionsDropdown";

type Props = {
  className?: string;
  linkProps: LinkProps;
  comment: TPostComment;
};

export default function PostCommentHeader({
  className,
  comment,
  linkProps,
}: Props) {
  const avatar = comment.author.avatar;
  const username = comment.author.username;
  const handle = comment.author.handle;
  const createdAt = comment.createdAt;

  const { timeAgo: createdAtRelativeTime } =
    useFormatToRelativeTimeOnInterval(createdAt);

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
          <p className="text-gray-500">{createdAtRelativeTime}</p>
        </div>
      </div>
      {comment.author.id === currentUser.id && (
        <PostCommentOptionsDropdown comment={comment} />
      )}
    </div>
  );
}
