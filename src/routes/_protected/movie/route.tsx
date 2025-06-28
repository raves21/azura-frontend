import { getDefaultTVMovieServer } from "@/utils/functions/media/sharedFunctions";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/movie")({
  component: () => <MovieLayout />,
});

function MovieLayout() {
  useEffect(() => {
    sessionStorage.setItem("lastMediaRouteVisited", "MOVIE");
    localStorage.setItem("defaultTVMovieServer", getDefaultTVMovieServer());
  }, []);

  return <Outlet />;
}
