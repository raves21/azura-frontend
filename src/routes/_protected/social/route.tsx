import FloatingPagesBar from "@/components/core/social/floatingPagesBar/FloatingPagesBar";
import FloatingCreateCommentBar from "@/components/core/social/mainContent/post/postInfo/postComments/FloatingCreateCommentBar";
import DiscoverPeoplePreview from "@/components/core/social/profilePreviewAndDiscoverPeople/discoverPeople/DiscoverPeoplePreview";
import ProfilePreview from "@/components/core/social/profilePreviewAndDiscoverPeople/profilePreview/ProfilePreview";
import Trending from "@/components/core/social/trending/Trending";
import { cn } from "@/lib/utils";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social")({
  component: () => <SocialPageLayout />,
});

function SocialPageLayout() {
  const matchRoute = useMatchRoute();
  const { isDesktopMediumUp, isTabletUp, isDesktopSmallUp } =
    useWindowBreakpoints();

  return (
    <main className="relative text-sm pb-10 flex justify-center gap-3 pt-[75px] sm:pt-[105px] text-mainWhite">
      {matchRoute({ to: "/social/$userHandle/posts/$postId" }) && (
        <FloatingCreateCommentBar />
      )}
      <FloatingPagesBar />
      <div className="flex-1 hidden space-y-4 rounded-xl xl:block">
        {matchRoute({ to: "/social" }) && <ProfilePreview />}
        <DiscoverPeoplePreview />
      </div>
      <div className="w-full md:w-[68%] xl:w-[50%]">
        <Outlet />
      </div>
      <div
        className={cn(
          "flex-1 hidden overflow-y-auto rounded-xl md:flex md:flex-col md:gap-4",
          { "mb-[300px]": isTabletUp && !isDesktopSmallUp }
        )}
      >
        {isTabletUp &&
          !isDesktopMediumUp &&
          !matchRoute({ to: "/social/$userHandle" }) &&
          !matchRoute({
            to: "/social/$userHandle/collections",
            fuzzy: true,
          }) && <ProfilePreview />}
        <Trending />
      </div>
    </main>
  );
}
