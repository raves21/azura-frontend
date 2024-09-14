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
    <div className="max-w-full w-dvw bg-darkBg text-[#f6f4f4]">
      <GlobalDialog/>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
}
