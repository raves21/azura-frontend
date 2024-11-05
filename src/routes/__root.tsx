import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import GlobalDialog from "@/components/global/GlobalDialog";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  return (
    <div className="max-w-full w-dvw bg-darkBg text-mainWhite">
      <GlobalDialog />
      <ScrollRestoration />
      <div className="font-montserrat px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
