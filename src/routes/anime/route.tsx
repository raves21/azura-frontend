import { createFileRoute, Outlet } from "@tanstack/react-router";
import HomeHeader from "./-HomeHeader";

export const Route = createFileRoute("/anime")({
  component: () => <AnimeHomeLayout />,
});

function AnimeHomeLayout() {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
}
