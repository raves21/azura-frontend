import FloatingPagesBar from "@/components/shared/social/floatingPagesBar/FloatingPagesBar";
import FloatingCreateCommentBar from "@/components/shared/social/mainContent/post/postInfo/postComments/FloatingCreateCommentBar";
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
    <main className="relative text-sm flex justify-center gap-3 pt-[75px] sm:pt-[105px] text-mainWhite">
      {matchRoute({ to: "/social/$userName/post/$postId" }) && (
        <FloatingCreateCommentBar />
      )}
      <FloatingPagesBar />
      <div className="flex-1 hidden space-y-4 rounded-xl xl:block">
        {matchRoute({ to: "/social" }) && <ProfilePreview />}
        <FollowSuggestions />
      </div>
      <div className="w-full md:w-[68%] xl:w-[50%]">
        <Outlet />
      </div>
      <div className="flex-1 hidden overflow-y-auto rounded-xl md:block">
        <Trending />
      </div>
    </main>
  );
}
