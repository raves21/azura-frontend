import { createFileRoute, Outlet } from "@tanstack/react-router";
import HomeHeader from "./-HomeHeader";

export const Route = createFileRoute("/anime")({
  component: () => <HomeLayout />,
});

function HomeLayout() {
  return (
    <div className="text-[#f6f4f4] font-montserrat w-full">
      <HomeHeader />
      <Outlet />
    </div>
  );
}
