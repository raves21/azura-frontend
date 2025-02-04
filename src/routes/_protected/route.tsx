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

export const Route = createFileRoute("/_protected")({
  component: () => <Protected />
});

function Protected() {
  const { data, isLoading, error } = useRefreshJWT();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const matchRoute = useMatchRoute();

  let currentRoute: "movie" | "anime" | "tv";
  if (matchRoute({ to: "/anime", fuzzy: true })) {
    currentRoute = "anime";
  } else if (matchRoute({ to: "/movie", fuzzy: true })) {
    currentRoute = "movie";
  } else {
    currentRoute = "tv";
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
          {currentRoute === "anime" && <AnimeTopNavBar />}
          {currentRoute === "movie" && <MovieTopNavBar />}
          {currentRoute === "tv" && <TVTopNavBar />}
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
