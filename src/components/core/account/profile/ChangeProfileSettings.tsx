import { useUserProfile } from "@/services/social/queries/socialQueries";
import { Navigate } from "@tanstack/react-router";
import ProfileDetails from "../../social/mainContent/profile/profileDetails/ProfileDetails";
import ProfileImages from "../../social/mainContent/profile/profileImages/ProfileImages";
import UserProfileSkeleton from "../../loadingSkeletons/social/UserProfileSkeleton";
import { useCurrentUser } from "@/services/auth/authQueries";

export default function ChangeProfileSettings() {
  const { data: currentUser } = useCurrentUser();
  const {
    data: userProfile,
    isPending: isUserProfilePending,
    error: userProfileError,
  } = useUserProfile(currentUser?.handle, currentUser?.handle);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isUserProfilePending) {
    return <UserProfileSkeleton className="max-w-[400px]" />;
  }

  if (userProfileError) {
    return (
      <div className="flex flex-col w-full gap-2 text-red-500 overflow-hidden rounded-lg mobile-m:gap-3 text-lg font-semibold py-4">
        There was an error fetching your user profile.
      </div>
    );
  }

  if (userProfile) {
    return (
      <div className="flex flex-col w-full gap-2 overflow-hidden rounded-lg mobile-m:gap-3 max-w-[650px]">
        <ProfileImages
          avatar={userProfile.avatar}
          banner={userProfile.banner}
        />
        <ProfileDetails
          id={userProfile.id}
          isCurrentUser
          avatar={userProfile.avatar}
          banner={userProfile.banner}
          bio={userProfile.bio}
          handle={userProfile.handle}
          totalFollowers={userProfile.totalFollowers}
          totalFollowing={userProfile.totalFollowing}
          userName={userProfile.username}
        />
      </div>
    );
  }
}
