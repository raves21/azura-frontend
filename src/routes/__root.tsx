import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalDialog from "@/components/global/GlobalDialog";
import GlobalSheet from "@/components/global/GlobalSheet";
import GlobalDrawer from "@/components/global/GlobalDrawer";
import GlobalDialogSecondary from "@/components/global/GlobalDialogSecondary";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <>
      <GlobalDialog />
      <GlobalDialogSecondary />
      <GlobalSheet />
      <GlobalDrawer />
      <Outlet />
    </>
  );
}
