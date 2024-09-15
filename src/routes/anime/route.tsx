import { createFileRoute, Outlet } from "@tanstack/react-router";
import HomeHeader from "./-HomeHeader";

export const Route = createFileRoute("/anime")({
  component: () => <AnimeHomeLayout />,
});

function AnimeHomeLayout() {
  return (
    <div className="font-montserrat px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] mx-auto">
      <HomeHeader />
      <Outlet />
    </div>
  );
}
