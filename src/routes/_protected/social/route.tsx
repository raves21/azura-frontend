import FloatingPagesBar from "@/components/core/social/floatingPagesBar/FloatingPagesBar";
import FloatingCreateCommentBar from "@/components/core/social/mainContent/post/postInfo/postComments/FloatingCreateCommentBar";
import FollowSuggestions from "@/components/core/social/profilePreviewAndDiscoverPeople/discoverPeople/DiscoverPeople";
import ProfilePreview from "@/components/core/social/profilePreviewAndDiscoverPeople/profilePreview/ProfilePreview";
import Trending from "@/components/core/social/trending/Trending";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social")({
  component: () => <SocialPageLayout />
});

function SocialPageLayout() {
  const matchRoute = useMatchRoute();
  return (
    <main className="relative text-sm pb-10 flex justify-center gap-3 pt-[75px] sm:pt-[105px] text-mainWhite">
      {matchRoute({ to: "/social/$userHandle/posts/$postId" }) && (
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
