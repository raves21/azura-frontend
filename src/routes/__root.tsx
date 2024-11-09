import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import GlobalDialog from "@/components/global/GlobalDialog";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <>
      <GlobalDialog />
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
