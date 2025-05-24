import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/_change-details")({
  component: () => <ChangeAccountDetailsLayout />,
});

function ChangeAccountDetailsLayout() {
  return (
    <div className="h-dvh w-full grid place-items-center">
      <Outlet />
    </div>
  );
}
