import { UserPreview } from "@/utils/types/social/social";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import ToggleFollowButton from "../mainContent/profile/profileDetails/ToggleFollowButton";

type UserListItemProps = UserPreview & {
  className?: string;
  type: "discoverPeople" | "searchPeople";
};

export default function UserListItem({
  avatar,
  handle,
  isFollowedByCurrentUser,
  bio,
  id,
  username,
  className,
  type,
}: UserListItemProps) {
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      onClick={() =>
        navigate({ to: "/social/$userHandle", params: { userHandle: handle } })
      }
      className={cn(
        "hover:cursor-pointer flex flex-col w-full py-3 hover:bg-socialPrimaryHover gap-[10px]",
        type === "searchPeople" ? "px-2" : "px-5",
        className
      )}
    >
      <div className="flex w-full">
        <img
          src={avatar || "/no-image-2.jpg"}
          className={cn(
            "object-cover rounded-full",
            type === "searchPeople" ? "size-12" : "size-10"
          )}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
        />
        <div
          className={cn(
            "flex-grow space-y-1 text-start",
            type === "searchPeople" ? "text-md pl-3" : "text-sm pl-2"
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
            type === "searchPeople" ? "text-md pl-[61px]" : "text-sm pl-[48px]"
          )}
        >
          {bio}
        </p>
      )}
    </div>
  );
}
