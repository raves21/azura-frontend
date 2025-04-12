import { useUserProfile } from "@/services/social/queries/socialQueries";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Navigate } from "@tanstack/react-router";
import UserAvatar from "../../shared/UserAvatar";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ViewProfileImageDialog from "../../shared/ViewProfileImageDialog";
import ProfileBioRenderer from "../../mainContent/profile/profileDetails/ProfileBioRenderer";
import ProfilePreviewSkeleton from "@/components/core/loadingSkeletons/social/ProfilePreviewSkeleton";

export default function ProfilePreview() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    data: currentUserProfile,
    isLoading: isCurrentUserProfileLoading,
    error: currentUserProfileError,
  } = useUserProfile(currentUser?.handle, currentUser?.handle);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isCurrentUserProfileLoading) {
    return <ProfilePreviewSkeleton />;
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
            onClick={() =>
              toggleOpenDialog(
                <ViewProfileImageDialog
                  src={currentUserProfile.banner ?? "/no-image-2.jpg"}
                  type="banner"
                />
              )
            }
            src={currentUserProfile.banner ?? "/no-image-2.jpg"}
            className="absolute inset-0 object-cover size-full hover:cursor-pointer"
          />
          <UserAvatar
            onClick={() =>
              toggleOpenDialog(
                <ViewProfileImageDialog
                  src={currentUserProfile.avatar ?? "/no-image-2.jpg"}
                  type="avatar"
                />
              )
            }
            src={currentUserProfile.avatar}
            imageClassName="absolute object-cover border-[0.5px] hover:cursor-pointer border-socialPrimary -translate-x-1/2 rounded-full -bottom-[30%] size-16 left-1/2"
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
            {currentUserProfile.bio ? (
              <ProfileBioRenderer content={currentUserProfile.bio} />
            ) : (
              <em>No bio</em>
            )}
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
