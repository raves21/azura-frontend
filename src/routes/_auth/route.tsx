import StaticLoadingPage from "@/components/core/shared/StaticLoadingPage";
import Waves from "@/components/core/shared/Waves";
import { useRefreshJWT } from "@/services/auth/authQueries";
import { MediaType } from "@/utils/types/shared";
import {
  createFileRoute,
  Link,
  LinkProps,
  Navigate,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => <AuthLayout />,
});

function AuthLayout() {
  const { data: accessToken, isLoading: isAccessTokenLoading } =
    useRefreshJWT();

  if (isAccessTokenLoading) {
    return <StaticLoadingPage />;
  }

  if (accessToken) {
    //get the value of the last media route visited from localStorage (either anime/tv/movie)
    const lastMediaRouteVisited = localStorage.getItem(
      "lastMediaRouteVisited"
    ) as MediaType | null;
    let authenticatedGotoLink: LinkProps;
    if (lastMediaRouteVisited) {
      switch (lastMediaRouteVisited) {
        case "ANIME":
          authenticatedGotoLink = { to: "/anime" };
          break;
        case "MOVIE":
          authenticatedGotoLink = { to: "/movie" };
          break;
        case "TV":
          authenticatedGotoLink = { to: "/tv" };
          break;
      }
      //if no lastMediaRouteVisited in localStorage, default to /movie
    } else {
      authenticatedGotoLink = { to: "/movie" };
    }
    return <Navigate {...authenticatedGotoLink} />;
  }

  return (
    <div className="relative grid min-h-screen text-mainWhite place-items-center bg-darkBg font-montserrat">
      <Waves />
      {!isAccessTokenLoading && (
        <Link className="absolute top-2 left-2" to="/login">
          <img
            className="box-content p-4 w-36"
            src="/azura-logo-with-label.svg"
          />
        </Link>
      )}
      <div className="z-10 flex flex-col items-center gap-8">
        <Outlet />
      </div>
    </div>
  );
}
