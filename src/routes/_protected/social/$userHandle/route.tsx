import UserProfileSkeleton from "@/components/shared/loadingSkeletons/social/UserProfileSkeleton";
import ProfileDetails from "@/components/shared/social/mainContent/profile/profileDetails/ProfileDetails";
import ProfileImages from "@/components/shared/social/mainContent/profile/profileImages/ProfileImages";
import ProfileTabs from "@/components/shared/social/mainContent/profile/profileTabs/ProfileTabs";
import { useUserProfile } from "@/services/social/queries/socialQueries";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userHandle")({
  component: () => <UserProfilePageLayout />
});

function UserProfilePageLayout() {
  const { userHandle } = Route.useParams();
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
    error: userProfileError
  } = useUserProfile(userHandle, currentUser?.handle);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isUserProfileLoading) {
    return <UserProfileSkeleton />;
  }

  if (userProfileError) {
    return (
      <div className="w-full pb-24 text-lg font-medium text-center pt-28">
        There was an error fetching this user profile.
      </div>
    );
  }

  if (userProfile) {
    const isCurrentUser = userProfile.id === currentUser.id;
    return (
      <main className="flex flex-col w-full gap-3 pb-10">
        <div className="flex flex-col w-full gap-2 overflow-hidden rounded-lg mobile-m:gap-3 bg-socialPrimary">
          <ProfileImages
            avatar={userProfile.avatar}
            banner={userProfile.banner}
          />
          {isCurrentUser ? (
            <ProfileDetails
              isCurrentUser
              avatar={userProfile.avatar}
              banner={userProfile.banner}
              bio={userProfile.bio}
              handle={userProfile.handle}
              totalFollowers={userProfile.totalFollowers}
              totalFollowing={userProfile.totalFollowing}
              userName={userProfile.username}
            />
          ) : (
            <ProfileDetails
              isCurrentUser={false}
              avatar={userProfile.avatar}
              banner={userProfile.banner}
              followsCurrentUser={userProfile.followsYou}
              isFollowedByCurrentUser={userProfile.followedByYou}
              bio={userProfile.bio}
              handle={userProfile.handle}
              totalFollowers={userProfile.totalFollowers}
              totalFollowing={userProfile.totalFollowing}
              userName={userProfile.username}
            />
          )}
          <ProfileTabs />
        </div>
        <Outlet />
      </main>
    );
  }
}
