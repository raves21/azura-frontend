import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/tv")({
  component: () => <TVLayout />,
});

function TVLayout() {
  useEffect(() => {
    sessionStorage.setItem("lastMediaRouteVisited", "TV");
  }, []);
  return <Outlet />;
}
