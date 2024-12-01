import UserProfileDetails from "@/components/shared/social/mainContent/profile/UserProfileDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/profile/$userName")({
  component: () => <UserProfilePageLayout />,
});

function UserProfilePageLayout() {
  return (
    <main className="flex flex-col w-full">
      <UserProfileDetails />
    </main>
  );
}
