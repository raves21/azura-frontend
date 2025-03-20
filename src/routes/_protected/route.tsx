import PulseCheckJWT from "@/components/core/auth/PulseCheckJWT";
import StaticLoadingPage from "@/components/core/StaticLoadingPage";
import { useRefreshJWT } from "@/services/auth/authQueries";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useMatchRoute
} from "@tanstack/react-router";
import MovieTopNavBar from "@/components/core/navBar/movie/MovieTopNavBar";
import AnimeTopNavBar from "@/components/core/navBar/anime/AnimeTopNavBar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import TVTopNavBar from "@/components/core/navBar/tv/TVTopNavBar";
import { ReactNode } from "react";
import { LastMediaRouteVisited } from "@/utils/types/shared";

export const Route = createFileRoute("/_protected")({
  component: () => <Protected />
});

function Protected() {
  const { data, isLoading, error } = useRefreshJWT();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const matchRoute = useMatchRoute();

  //get the value of the last media route visited from localStorage (either anime/tv/movie)
  const lastMediaRouteVisited = localStorage.getItem(
    "lastMediaRouteVisited"
  ) as LastMediaRouteVisited | null;

  let topNavBar: ReactNode;

  if (lastMediaRouteVisited) {
    switch (lastMediaRouteVisited) {
      case "anime":
        topNavBar = <AnimeTopNavBar />;
        break;
      case "movie":
        topNavBar = <MovieTopNavBar />;
        break;
      case "tv":
        topNavBar = <TVTopNavBar />;
        break;
    }
  } else {
    localStorage.setItem("lastMediaRouteVisited", "movie");
    topNavBar = <MovieTopNavBar />;
  }

  if (isLoading) return <StaticLoadingPage />;
  if (error) {
    setCurrentUser(null);
    return <Navigate to="/login" />;
  }

  if (data) {
    setCurrentUser(data.currentUserBasicInfo);
    return (
      <PulseCheckJWT>
        <div className="max-w-full w-dvw bg-darkBg text-mainWhite">
          {topNavBar}
          <div
            className={cn(
              "font-montserrat px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] mx-auto",
              { "px-1": matchRoute({ to: "/social", fuzzy: true }) }
            )}
          >
            <Outlet />
          </div>
        </div>
      </PulseCheckJWT>
    );
  }
}
