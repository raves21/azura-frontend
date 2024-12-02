import FloatingPagesBar from "@/components/shared/social/floatingPagesBar/FloatingPagesBar";
import FollowSuggestions from "@/components/shared/social/profilePreviewAndFollowSuggestions/followSuggestions/FollowSuggestions";
import ProfilePreview from "@/components/shared/social/profilePreviewAndFollowSuggestions/profilePreview/ProfilePreview";
import Trending from "@/components/shared/social/trending/Trending";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social")({
  component: () => <SocialPageLayout />,
});

function SocialPageLayout() {
  const matchRoute = useMatchRoute();

  return (
    <main className="relative text-sm flex justify-center gap-4 pt-[105px] bg-darkBg text-mainWhite">
      <FloatingPagesBar />
      <div className="flex-1 space-y-4 rounded-xl">
        {matchRoute({ to: "/social" }) && <ProfilePreview />}
        <FollowSuggestions />
      </div>
      <div className="w-[50%]">
        <Outlet />
      </div>
      <div className="sticky flex-1 rounded-xl top-12">
        <Trending />
      </div>
    </main>
  );
}
