import { useUnfollowUser } from "@/services/social/queries/socialQueries";
import { X, Check } from "lucide-react";
import { useState } from "react";

type UnfollowButtonProps = {
  userId: string;
  userHandle: string;
};

export default function UnfollowButton({
  userId,
  userHandle
}: UnfollowButtonProps) {
  const { mutateAsync: unfollowUser } = useUnfollowUser();
  const [isHoveringFollowingButton, setIsHoveringFollowingButton] =
    useState(false);

  return (
    <button
      onClick={async () => await unfollowUser({ userId, userHandle })}
      onMouseEnter={() => setIsHoveringFollowingButton(true)}
      onMouseLeave={() => setIsHoveringFollowingButton(false)}
      className="flex items-center self-end gap-2 px-4 py-2 font-semibold transition-colors border border-gray-600 rounded-full sm:px-5 lg:text-md hover:text-red-500 hover:border-red-500 lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs hover:bg-red-500/20"
    >
      {isHoveringFollowingButton ? (
        <>
          <X className="size-3 sm:size-5 stroke-red-500" />
          <p>Unfollow</p>
        </>
      ) : (
        <>
          <Check className="size-3 sm:size-5 stroke-blue-500" />
          <p>Following</p>
        </>
      )}
    </button>
  );
}
