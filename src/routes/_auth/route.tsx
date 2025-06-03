import StaticLoadingPage from "@/components/core/shared/StaticLoadingPage";
import Waves from "@/components/core/shared/Waves";
import { useCurrentUser } from "@/services/auth/api/queries";
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
  const { data: authUser, isLoading: isAuthUserPending } = useCurrentUser();

  if (isAuthUserPending) {
    return <StaticLoadingPage />;
  }

  if (authUser) {
    //get the value of the last media route visited from sessionStorage (either anime/tv/movie)
    const lastMediaRouteVisited = sessionStorage.getItem(
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
      //if no lastMediaRouteVisited in sessionStorage, default to /movie
    } else {
      authenticatedGotoLink = { to: "/movie" };
    }
    return <Navigate {...authenticatedGotoLink} />;
  }

  return (
    <div className="relative grid min-h-dvh text-mainWhite place-items-center bg-darkBg font-montserrat">
      <Waves />
      {!isAuthUserPending && (
        <Link className="absolute top-2 left-2" to="/login">
          <img
            className="box-content p-4 w-28 sm:w-36"
            src="/azura-logo-with-label.svg"
          />
        </Link>
      )}
      <div className="z-10 flex flex-col items-center gap-8 w-full px-4 mobile-l:px-0">
        <Outlet />
      </div>
    </div>
  );
}
