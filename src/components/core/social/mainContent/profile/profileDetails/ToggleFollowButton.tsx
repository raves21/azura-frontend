import { useState } from "react";
import Unfollow from "./Unfollow";
import Follow from "./Follow";
import {
  useFollowUser,
  useUnfollowUser,
} from "@/services/social/queries/socialQueries";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useDebounceOnClick } from "@/utils/hooks/useDebounceOnClick";
import {
  followUser_UserPreviewListCacheMutation,
  followUser_UserProfileCacheMutation,
  unfollowUser_UserPreviewListCacheMutation,
  unFollowUser_UserProfileCacheMutation,
} from "@/services/social/functions/cacheMutations";
import { Navigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  type: "profilePage" | "userPreview";
  userId: string;
  userHandle: string;
  isFollow: boolean;
};

export default function ToggleFollowButton({
  isFollow,
  type,
  userHandle,
  userId,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);

  const { mutateAsync: followUser } = useFollowUser();
  const { mutateAsync: unfollowUser } = useUnfollowUser();

  function handleToggleButton() {
    if (isFollow) {
      unfollowUser_UserPreviewListCacheMutation({
        userHandle,
      });
      unFollowUser_UserProfileCacheMutation({
        currentUserHandle: currentUser?.handle,
        userHandle,
      });
    } else {
      followUser_UserPreviewListCacheMutation({
        userHandle,
      });
      followUser_UserProfileCacheMutation({
        currentUserHandle: currentUser?.handle,
        userHandle,
      });
    }
  }

  async function toggleFollow() {
    if (isFollow) {
      await followUser({
        currentUserHandle: currentUser?.handle,
        userHandle,
        userId,
      });
    } else {
      await unfollowUser({
        currentUserHandle: currentUser?.handle,
        userHandle,
        userId,
      });
    }
  }

  useDebounceOnClick({
    action: () => toggleFollow(),
    toggleState: isFollow,
    skipFirstRender: true,
  });

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <button
      className={cn({ "self-end": type === "profilePage" })}
      onClick={(e) => {
        if (type === "userPreview") {
          e.stopPropagation();
        }
        handleToggleButton();
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isFollow ? (
        <Unfollow type={type} isHovering={isHovering} />
      ) : (
        <Follow type={type} />
      )}
    </button>
  );
}
