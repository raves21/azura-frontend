import { tmdbApi } from "@/utils/variables/axiosInstances/tmdbAxiosInstance";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/no-internet")({
  component: () => <NoInternet />,
});

function NoInternet() {
  const navigate = useNavigate();

  useEffect(() => {
    async function testInternet() {
      //test if has internet (tmdbApi has interceptor to navigate to this route if network error)
      await tmdbApi.get("/genre/movie/list");
      //if succeeds, navigate to login
      navigate({ to: "/login" });
    }
    testInternet();
  }, []);

  return (
    <div className="grid place-items-center h-dvh text-3xl font-medium text-mainWhite bg-darkBg">
      No internet.
    </div>
  );
}
