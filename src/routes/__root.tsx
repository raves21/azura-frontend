import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <div className="max-w-full w-dvw bg-darkBg">
      <div className="max-w-[1440px] mx-auto">
        <ScrollRestoration />
        <Outlet />
      </div>
    </div>
  );
}
