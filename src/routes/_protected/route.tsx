import PulseCheckJWT from "@/components/shared/auth/PulseCheckJWT";
import StaticLoadingPage from "@/components/shared/StaticLoadingPage";
import { useAccessToken } from "@/services/auth/authQueries";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import HomeHeader from "../../components/shared/HomeHeader";

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
        <div className="max-w-full w-dvw bg-darkBg text-mainWhite">
          <HomeHeader />
          <div className="font-montserrat px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] mx-auto">
            <Outlet />
          </div>
        </div>
      </PulseCheckJWT>
    );
  }
}
