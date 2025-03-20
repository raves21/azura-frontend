import { useFollowUser } from "@/services/social/queries/socialQueries";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Navigate } from "@tanstack/react-router";

type FollowButtonProps = {
  type: "profilePage" | "userPreview";
  userId: string;
  userHandle: string;
};

export default function FollowButton({
  type,
  userId,
  userHandle
}: FollowButtonProps) {
  const { mutateAsync: followUser } = useFollowUser();

  const currentUser = useAuthStore((state) => state.currentUser)
  if(!currentUser) return <Navigate to="/login" replace/>

  if (type === "profilePage") {
    return (
      <button
        onClick={async () => await followUser({ userId, userHandle, currentUserHandle: currentUser.handle })}
        className="self-end px-4 py-2 font-semibold transition-colors border rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs text-mainWhite hover:text-gray-300 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-mainAccent"
      >
        Follow
      </button>
    );
  }
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await followUser({ userId, userHandle, currentUserHandle: currentUser.handle });
      }}
      className="w-[90px] py-3 h-min ml-auto text-xs font-semibold text-gray-800 hover:text-gray-900 bg-mainWhite hover:bg-gray-400 border-gray-800 hover:border-gray-900 rounded-full"
    >
      Follow
    </button>
  );
}
