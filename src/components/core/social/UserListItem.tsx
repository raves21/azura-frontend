import UnfollowButton from "./mainContent/profile/profileDetails/UnfollowButton";
import FollowButton from "./mainContent/profile/profileDetails/FollowButton";
import { UserPreview } from "@/utils/types/social/social";
import { useNavigate } from "@tanstack/react-router";

export default function UserListItem({
  avatar,
  handle,
  isFollowedByCurrentUser,
  bio,
  id,
  username
}: UserPreview) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate({ to: "/social/$userHandle", params: { userHandle: handle } })
      }
      className="flex flex-col w-full gap-[10px] py-3 hover:bg-socialPrimaryHover px-5"
    >
      <div className="flex w-full">
        <img
          src={avatar || "/no-image-2.jpg"}
          className="object-cover rounded-full size-10"
        />
        <div className="flex-grow pl-2 space-y-1 text-sm text-start">
          <p className="font-semibold line-clamp-1">{username}</p>
          <p className="text-socialTextSecondary line-clamp-1">
            <span>@</span>
            {handle}
          </p>
        </div>
        {isFollowedByCurrentUser ? (
          <UnfollowButton type="userPreview" userHandle={handle} userId={id} />
        ) : (
          <FollowButton type="userPreview" userHandle={handle} userId={id} />
        )}
      </div>
      {bio && <p className="pl-[52px] line-clamp-2">{bio}</p>}
    </button>
  );
}
