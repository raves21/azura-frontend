import PulseCheckAuth from "@/components/core/auth/shared/PulseCheckAuth";
import StaticLoadingPage from "@/components/core/shared/StaticLoadingPage";
import { useCurrentUser } from "@/services/auth/authQueries";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";
import MovieTopNavBar from "@/components/core/navBar/topNavBar/movie/MovieTopNavBar";
import AnimeTopNavBar from "@/components/core/navBar/topNavBar/anime/AnimeTopNavBar";
import { cn } from "@/lib/utils";
import TVTopNavBar from "@/components/core/navBar/topNavBar/tv/TVTopNavBar";
import { ReactNode } from "react";
import { MediaType } from "@/utils/types/shared";
import BottomNavBar from "@/components/core/navBar/bottomNavBar/BottomNavBar";

export const Route = createFileRoute("/_protected")({
  component: () => <Protected />,
});

function Protected() {
  const {
    data: currentUser,
    isPending: isCurrentUserPending,
    error: currentUserError,
  } = useCurrentUser();
  // const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const matchRoute = useMatchRoute();

  //get the value of the last media route visited from sessionStorage (either anime/tv/movie)
  const lastMediaRouteVisited = sessionStorage.getItem(
    "lastMediaRouteVisited"
  ) as MediaType | null;

  let topNavBar: ReactNode;
  let bottomNavBarType: MediaType;

  if (lastMediaRouteVisited) {
    switch (lastMediaRouteVisited) {
      case "ANIME":
        topNavBar = <AnimeTopNavBar />;
        bottomNavBarType = "ANIME";
        break;
      case "MOVIE":
        topNavBar = <MovieTopNavBar />;
        bottomNavBarType = "MOVIE";
        break;
      case "TV":
        topNavBar = <TVTopNavBar />;
        bottomNavBarType = "TV";
        break;
    }
  } else {
    sessionStorage.setItem("lastMediaRouteVisited", "MOVIE");
    topNavBar = <MovieTopNavBar />;
    bottomNavBarType = "MOVIE";
  }

  if (isCurrentUserPending) return <StaticLoadingPage />;
  if (currentUserError) return <Navigate to="/login" replace />;

  if (currentUser) {
    return (
      <PulseCheckAuth>
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
          <BottomNavBar type={bottomNavBarType} />
        </div>
      </PulseCheckAuth>
    );
  }
}
