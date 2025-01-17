import { useFollowUser } from "@/services/social/queries/socialQueries";

type FollowButtonProps = {
  userId: string;
  userHandle: string;
};

export default function FollowButton({
  userId,
  userHandle
}: FollowButtonProps) {
  const { mutateAsync: followUser } = useFollowUser();

  return (
    <button
      onClick={async () => await followUser({ userId, userHandle })}
      className="self-end px-4 py-2 font-semibold transition-colors border rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs text-mainWhite hover:text-gray-300 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-mainAccent"
    >
      Follow
    </button>
  );
}
