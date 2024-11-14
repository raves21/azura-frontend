import StaticLoadingPage from "@/components/shared/StaticLoadingPage";
import Waves from "@/components/shared/Waves";
import { useAccessToken } from "@/services/auth/authQueries";
import {
  createFileRoute,
  Link,
  Navigate,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => <AuthLayout />,
});

function AuthLayout() {
  const { data: accessToken, isLoading: isAccessTokenLoading } =
    useAccessToken();

  if (isAccessTokenLoading) {
    return <StaticLoadingPage />;
  }

  if (accessToken) {
    return <Navigate to="/anime" />;
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
