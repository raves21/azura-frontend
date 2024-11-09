import StaticLoadingPage from "@/components/shared/StaticLoadingPage";
import Waves from "@/components/shared/Waves";
import { useAccessToken } from "@/services/auth/authQueries";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

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
    <div className="relative grid h-screen text-white place-items-center bg-darkBg font-montserrat">
      <Waves />
      {!isAccessTokenLoading && (
        <img
          className="absolute -top-6 left-6 size-36"
          src="/azura-logo-with-label.svg"
        />
      )}
      <Outlet />
    </div>
  );
}
