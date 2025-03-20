import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { UserPreview } from "@/utils/types/social/social";
import { Link } from "@tanstack/react-router";

type SearchPeopleResultCardProps = {
  user: UserPreview;
};

export default function SearchPeopleResultCard({
  user
}: SearchPeopleResultCardProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <Link
      to="/social/$userHandle"
      params={{
        userHandle: user.handle
      }}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-3 py-2 hover:bg-gray-900/70"
    >
      <div className="rounded-md aspect-square size-14 md:size-20">
        <img
          src={user.avatar || "/no-image-2.jpg"}
          alt={user.username}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover rounded-full size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full text-sm mobile-l:text-md md:text-base">
        <p className="font-semibold line-clamp-1">{user.username}</p>
        <p className="font-semibold line-clamp-1 text-socialTextSecondary">
          <span>@</span>
          {user.handle}
        </p>
        <p className="mt-2 text-gray-300 line-clamp-2">
          {user.bio ? user.bio : <em>No bio</em>}
        </p>
      </div>
    </Link>
  );
}
