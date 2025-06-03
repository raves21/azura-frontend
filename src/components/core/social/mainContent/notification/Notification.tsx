import { TNotification } from "@/utils/types/social/social";
import NotificationText from "./NotificationText";
import UserAvatar from "../../shared/UserAvatar";
import { LinkProps, Navigate, useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "@/services/auth/api/queries";
import { useFormatToRelativeTimeOnInterval } from "@/utils/hooks/useFormatToRelativeTimeOnInterval";
import { queryClient } from "@/utils/variables/queryClient";

type Props = {
  notification: TNotification;
};

export default function Notification({ notification }: Props) {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();

  const { timeAgo: updatedAtRelativeTime } = useFormatToRelativeTimeOnInterval(
    notification.updatedAt.toString()
  );

  if (!currentUser) return <Navigate to="/login" replace />;

  let linkProps: LinkProps;
  if (notification.type === "FOLLOW") {
    linkProps = {
      to: "/social/$userHandle",
      params: {
        userHandle: notification.actorsPreview[0].handle,
      },
    };
  } else {
    //blablabla on YOUR post
    linkProps = {
      to: "/social/$userHandle/posts/$postId",
      params: {
        userHandle: currentUser.handle,
        postId: notification.postId!,
      },
    };
  }

  return (
    <button
      onClick={() => {
        if(notification.postId){
          queryClient.invalidateQueries({
          queryKey: [`postInfo`, notification.postId],
        });
        }
        navigate(linkProps);
      }}
      className="text-start w-full hover:bg-socialPrimaryHover items-start flex text-sm mobile-m:text-base px-3 py-4 gap-4 570:gap-6 mobile-m:px-4 mobile-m:py-5 md:p-5"
    >
      <UserAvatar
        src={notification.actorsPreview[0].avatar}
        imageClassName="size-14 sm:size-16 md:size-[68px]"
      />
      <div className="flex flex-col gap-3 justify-between flex-grow">
        <p className="line-clamp-2 text-sm mobile-m:text-md sm:text-base">
          <NotificationText notification={notification} />
        </p>
        <p className="text-xs mobile-m:text-sm md:text-base text-socialTextSecondary">
          {updatedAtRelativeTime}
        </p>
      </div>
    </button>
  );
}
