import ProfileDetails from "@/components/shared/social/mainContent/profile/profileDetails/ProfileDetails";
import ProfileImages from "@/components/shared/social/mainContent/profile/profileImages/ProfileImages";
import ProfileTabs from "@/components/shared/social/mainContent/profile/profileTabs/ProfileTabs";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userName")({
  component: () => <UserProfilePageLayout />,
});

function UserProfilePageLayout() {
  return (
    <main className="flex flex-col w-full gap-3 pb-10">
      <div className="flex flex-col w-full gap-2 overflow-hidden rounded-lg mobile-m:gap-3 bg-socialPrimary">
        <ProfileImages
          avatar="/sample-user-pfp.png"
          banner="/sample-user-banner.jpg"
        />
        <ProfileDetails />
        <ProfileTabs />
      </div>
      <Outlet />
    </main>
  );
}
