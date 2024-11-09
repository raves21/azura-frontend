import PulseCheckJWT from "@/components/shared/PulseCheckJWT";
import StaticLoadingPage from "@/components/shared/StaticLoadingPage";
import { useAccessToken } from "@/services/auth/authQueries";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: () => <Protected />,
});

function Protected() {
  const { data, isLoading, error } = useAccessToken();

  if (isLoading) return <StaticLoadingPage />;
  if (error) return <Navigate to="/login" />;

  if (data) {
    return (
      <PulseCheckJWT>
        <Outlet />
      </PulseCheckJWT>
    );
  }
}
