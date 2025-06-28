import { getDefaultAnimeServer } from "@/utils/functions/media/sharedFunctions";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/anime")({
  component: () => <AnimeLayout />,
});

function AnimeLayout() {
  useEffect(() => {
    sessionStorage.setItem("lastMediaRouteVisited", "ANIME");
    localStorage.setItem("defaultAnimeServer", getDefaultAnimeServer());
  }, []);
  return <Outlet />;
}
