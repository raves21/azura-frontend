import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserProfile } from "@/services/auth/socialQueries";
import { useAuthStore } from "@/utils/stores/authStore";
import { Link, Navigate } from "@tanstack/react-router";

export default function ProfilePreview() {
  const {
    data: currentUserProfile,
    isLoading: isCurrentUserProfileLoading,
    error: currentUserProfileError,
  } = useCurrentUserProfile();
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isCurrentUserProfileLoading) {
    return (
      <Skeleton className="h-[376px] bg-socialPrimary flex flex-col w-full gap-8 overflow-hidden text-base rounded-lg">
        <Skeleton className="relative top-0 w-full h-24 bg-gray-700">
          <Skeleton className="absolute inset-0 object-cover bg-gray-600 size-full" />
          <Skeleton className="absolute -translate-x-1/2 rounded-full bg-gray-600 -bottom-[30%] size-16 left-1/2" />
        </Skeleton>
        <div className="flex flex-col items-center gap-3 px-3 mt-4">
          <Skeleton className="w-[50%] h-4 bg-gray-600" />
          <Skeleton className="w-[40%] h-3 bg-gray-600" />
        </div>
      </Skeleton>
    );
  }

  if (currentUserProfileError) {
    return (
      <div className="h-[376px] bg-socialPrimary flex flex-col w-full overflow-hidden text-base rounded-lg">
        <div className="relative top-0 w-full h-24">
          <img
            src="/no-image-2.jpg"
            className="absolute inset-0 object-cover size-full"
          />
          <img
            src="/no-image-2.jpg"
            className="absolute object-cover -translate-x-1/2 rounded-full -bottom-[30%] size-16 left-1/2"
          />
        </div>
        <div className="flex flex-col items-center gap-3 px-3 mt-24">
          <p className="font-medium text-center w-[80%]">
            There was an error fetching the user profile
          </p>
        </div>
        <Link
          to={`/social/${currentUser.handle}`}
          className="grid w-full py-4 mt-auto text-sm text-blue-500 rounded-bl-lg rounded-br-lg place-items-center hover:bg-socialPrimaryHover"
        >
          My Profile
        </Link>
      </div>
    );
  }

  if (currentUserProfile) {
    return (
      <div className="flex flex-col w-full gap-5 overflow-hidden text-base rounded-lg bg-socialPrimary">
        <div className="relative top-0 w-full h-24">
          <img
            src={currentUserProfile.banner ?? "/no-image-2.jpg"}
            className="absolute inset-0 object-cover size-full"
          />
          <img
            src={currentUserProfile.avatar ?? "/no-image.png"}
            className="absolute object-cover -translate-x-1/2 rounded-full -bottom-[30%] size-16 left-1/2"
          />
        </div>
        <div className="flex flex-col gap-3 px-3 mt-4">
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {currentUserProfile.username}
            </p>
            <p className="text-base text-gray-500">
              @{currentUserProfile.handle}
            </p>
          </div>
          <p className="px-5 text-center text-gray-300 line-clamp-3">
            {currentUserProfile.bio ?? "No bio"}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-around w-full py-3 border-socialTextSecondary">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">
                {currentUserProfile.totalFollowing}
              </p>
              <p className="text-socialTextSecondary">Following</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">
                {currentUserProfile.totalFollowers}
              </p>
              <p className="text-socialTextSecondary">Followers</p>
            </div>
          </div>
          <Link
            to={`/social/${currentUser.handle}`}
            className="grid w-full py-4 mt-auto text-sm text-blue-500 rounded-bl-lg rounded-br-lg place-items-center hover:bg-socialPrimaryHover"
          >
            My Profile
          </Link>
        </div>
      </div>
    );
  }
}
