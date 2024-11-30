import FollowSuggestions from "@/components/shared/social/profilePreviewAndFollowSuggestions/followSuggestions/FollowSuggestions";
import ProfilePreview from "@/components/shared/social/profilePreviewAndFollowSuggestions/profilePreview/ProfilePreview";
import Trending from "@/components/shared/social/trending/Trending";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social")({
  component: () => <SocialPageLayout />,
});

function SocialPageLayout() {
  return (
    <main className="relative flex justify-center gap-4 pt-[105px] bg-darkBg text-mainWhite">
      <div className="rounded-xl w-[25%] space-y-4">
        <ProfilePreview />
        <FollowSuggestions />
      </div>
      <Outlet />
      <div className="rounded-xl w-[25%] sticky top-12">
        <Trending />
      </div>
    </main>
  );
}
