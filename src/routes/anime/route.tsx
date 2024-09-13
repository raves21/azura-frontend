import { createFileRoute, Outlet } from "@tanstack/react-router";
import HomeHeader from "./-HomeHeader";

export const Route = createFileRoute("/anime")({
  component: () => <AnimeHomeLayout />,
});

function AnimeHomeLayout() {
  return (
    <div className="w-full font-montserrat">
      <HomeHeader />
      <Outlet />
    </div>
  );
}
