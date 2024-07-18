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
    <div>
      <ScrollRestoration/>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
