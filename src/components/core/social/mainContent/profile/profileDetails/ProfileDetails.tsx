import { Link } from "@tanstack/react-router";
import ProfileBioRenderer from "./ProfileBioRenderer";
import EditProfileButton from "./EditProfileButton";
import ToggleFollowButton from "./ToggleFollowButton";

type CurrentUserProps = {
  isCurrentUser: true;
};

type NotCurrentUserProps = {
  isCurrentUser: false;
  followsCurrentUser: boolean;
  isFollowedByCurrentUser: boolean;
};

type Props = {
  id: string;
  userName: string;
  handle: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  totalFollowers: number;
  totalFollowing: number;
} & (CurrentUserProps | NotCurrentUserProps);

export default function ProfileDetails({
  id,
  userName,
  handle,
  bio,
  avatar,
  banner,
  totalFollowers,
  totalFollowing,
  ...props
}: Props) {
  const notCurrentUserProps = !props.isCurrentUser
    ? (props as NotCurrentUserProps)
    : undefined;

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-5">
      {notCurrentUserProps ? (
        <ToggleFollowButton
          isFollow={notCurrentUserProps.isFollowedByCurrentUser}
          type="profilePage"
          userHandle={handle}
          userId={id}
        />
      ) : (
        <EditProfileButton
          avatar={avatar}
          userName={userName}
          bio={bio}
          banner={banner}
        />
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
          <Link
            to="/social/$userHandle/following"
            params={{
              userHandle: handle,
            }}
            className="hover:underline underline-offset-4 decoration-1"
          >
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
          <Link
            to="/social/$userHandle/followers"
            params={{
              userHandle: handle,
            }}
            className="hover:underline underline-offset-4 decoration-1"
          >
            <span className="font-semibold">{totalFollowers}&nbsp;</span>
            <span className="text-socialTextSecondary">follower</span>
          </Link>
        ) : (
          <p>
            <span className="font-semibold">0&nbsp;</span>
            <span className="text-socialTextSecondary">followers</span>
          </p>
        )}
      </div>
    </div>
  );
}
