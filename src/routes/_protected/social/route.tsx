import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social")({
  component: () => <SocialPageLayout />,
});

function SocialPageLayout() {
  return (
    <main className="relative flex justify-center gap-4 pt-[105px] bg-darkBg text-mainWhite">
      <div className="rounded-xl border border-gray-600 w-[25%] h-[110dvh]"></div>
      <Outlet />
      <div className="rounded-xl border border-gray-600 w-[25%] h-[100dvh] sticky top-12"></div>
    </main>
  );
}
