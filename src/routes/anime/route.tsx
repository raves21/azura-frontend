import { createFileRoute, Outlet } from "@tanstack/react-router";
import HomeHeader from "./-HomeHeader";

export const Route = createFileRoute("/anime")({
  component: () => <HomeLayout />,
});

function HomeLayout() {
  return (
    <div className="w-full font-montserrat">
      <HomeHeader />
      <Outlet />
    </div>
  );
}
