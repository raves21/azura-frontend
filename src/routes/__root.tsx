import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import GlobalDialog from "@/components/global/GlobalDialog";
import GlobalSheet from "@/components/global/GlobalSheet";
import GlobalDrawer from "@/components/global/GlobalDrawer";
import GlobalDialogSecondary from "@/components/global/GlobalDialogSecondary";
import MediaPortal from "@/components/global/mediaPortal/MediaPortal";
import SocialFloatingActionButton from "@/components/core/social/shared/socialFAB/SocialFloatingActionButton";
import { Toaster } from "@/components/ui/toaster";
import { useShowPWAPrompt } from "@/utils/hooks/useShowPWAPrompt";
import InstallPWADialog from "@/components/core/shared/InstallPWADialog";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  const matchRoute = useMatchRoute();
  const isSocialRoute = matchRoute({ to: "/social", fuzzy: true });

  useShowPWAPrompt(<InstallPWADialog/>)

  return (
    <>
      {isSocialRoute && <SocialFloatingActionButton />}
      <Toaster />
      <MediaPortal />
      <GlobalDialog />
      <GlobalDialogSecondary />
      <GlobalSheet />
      <GlobalDrawer />
      <Outlet />
    </>
  );
}
