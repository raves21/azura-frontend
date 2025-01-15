import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "../editProfileDialog/EditProfileDialog";
import ProfileBioRenderer from "./ProfileBioRenderer";

type CurrentUserProps = {
  isCurrentUser: true;
};

type NotCurrentUserProps = {
  isCurrentUser: false;
  followsCurrentUser: boolean;
  isFollowedByCurrentUser: boolean;
};

type ProfileDetailsProps = {
  userName: string;
  handle: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  totalFollowers: number;
  totalFollowing: number;
} & (CurrentUserProps | NotCurrentUserProps);

export default function ProfileDetails({
  userName,
  handle,
  bio,
  avatar,
  banner,
  totalFollowers,
  totalFollowing,
  ...props
}: ProfileDetailsProps) {
  const notCurrentUserProps = !props.isCurrentUser
    ? (props as NotCurrentUserProps)
    : undefined;

  const [isHoveringFollowingButton, setIsHoveringFollowingButton] =
    useState(false);

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-5">
      {!notCurrentUserProps ? (
        <button
          onClick={() =>
            toggleOpenDialog(
              <EditProfileDialog
                avatar={avatar}
                banner={banner}
                bio={bio}
                userName={userName}
              />
            )
          }
          className="self-end px-4 py-2 font-semibold transition-colors border border-gray-600 rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs hover:border-mainAccent hover:text-mainAccent hover:bg-socialPrimaryHover"
        >
          Edit Profile
        </button>
      ) : notCurrentUserProps.isFollowedByCurrentUser ? (
        <button className="self-end px-4 py-2 font-semibold transition-colors border rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs text-mainWhite hover:text-gray-300 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-mainAccent">
          Follow
        </button>
      ) : (
        <button
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
      )}
      <div className="flex flex-col sm:mt-4">
        <p className="font-semibold text-md mobile-m:text-base sm:text-lg">
          {userName}
        </p>
        <p className="text-sm text-socialTextSecondary mobile-m:text-md sm:text-base">
          @{handle}
        </p>
      </div>
      <p className="text-sm mobile-m:text-md sm:text-base line-clamp-5">
        {bio ? <ProfileBioRenderer content={bio} /> : <em>No bio</em>}
      </p>
      <div className="flex gap-6 text-sm mobile-m:text-md sm:text-base">
        {totalFollowing !== 0 ? (
          <Link>
            <span className="font-semibold">{totalFollowing}&nbsp;</span>
            <span className="text-socialTextSecondary">following</span>
          </Link>
        ) : (
          <p>
            <span className="font-semibold">0&nbsp;</span>
            <span className="text-socialTextSecondary">following</span>
          </p>
        )}
        {totalFollowers !== 0 ? (
          <Link>
            <span className="font-semibold">{totalFollowers}&nbsp;</span>
            <span className="text-socialTextSecondary">following</span>
          </Link>
        ) : (
          <p>
            <span className="font-semibold">0&nbsp;</span>
            <span className="text-socialTextSecondary">following</span>
          </p>
        )}
      </div>
    </div>
  );
}
