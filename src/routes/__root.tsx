import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalDialog from "@/components/global/GlobalDialog";
import GlobalSheet from "@/components/global/GlobalSheet";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <>
      <GlobalDialog />
      <GlobalSheet />
      <Outlet />
    </>
  );
}
