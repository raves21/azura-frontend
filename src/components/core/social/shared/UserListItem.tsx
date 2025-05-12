import { UserPreview } from "@/utils/types/social/social";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/auth/authQueries";
import ToggleFollowButton from "../mainContent/profile/profileDetails/ToggleFollowButton";

type UserListItemProps = UserPreview & {
  className?: string;
  isDiscoverPeopleSection?: boolean;
};

export default function UserListItem({
  avatar,
  handle,
  isFollowedByCurrentUser,
  bio,
  id,
  username,
  className,
  isDiscoverPeopleSection,
}: UserListItemProps) {
  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      onClick={() =>
        navigate({ to: "/social/$userHandle", params: { userHandle: handle } })
      }
      className={cn(
        "hover:cursor-pointer flex flex-col w-full py-3 hover:bg-socialPrimaryHover gap-[10px]",
        isDiscoverPeopleSection ? "px-5" : "px-2 sm:px-5",
        className
      )}
    >
      <div className="flex w-full">
        <img
          src={avatar || "/no-image-2.jpg"}
          className={cn(
            "object-cover rounded-full",
            isDiscoverPeopleSection ? "size-10" : "size-12 md:size-14"
          )}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
        />
        <div
          className={cn(
            "flex-grow space-y-1 text-start",
            isDiscoverPeopleSection ? "text-sm pl-2" : "text-md pl-4"
          )}
        >
          <p className="font-semibold line-clamp-1">{username}</p>
          <p className="text-socialTextSecondary line-clamp-1">
            <span>@</span>
            {handle}
          </p>
        </div>
        {currentUser.id !== id && (
          <ToggleFollowButton
            isFollow={isFollowedByCurrentUser}
            type="userPreview"
            userHandle={handle}
            userId={id}
          />
        )}
      </div>
      {bio && (
        <p
          className={cn(
            "line-clamp-2",
            isDiscoverPeopleSection
              ? "text-sm pl-[48px]"
              : "text-md pl-[65px] md:pl-[73px]"
          )}
        >
          {bio}
        </p>
      )}
    </div>
  );
}
