import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <div className="max-w-full w-dvw bg-darkBg">
      <div className="max-w-[1440px] mx-auto">
        <ScrollRestoration />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </div>
    </div>
  );
}
