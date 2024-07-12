import { createFileRoute } from "@tanstack/react-router";
import { useFetchPopularAnimes } from "../../api/animes";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/home/")({
  component: () => <Home />,
});

function Home() {
  const { data, isLoading } = useFetchPopularAnimes();

  if(isLoading){
    return (
      <div className="grid text-white bg-gray-900 min-h-dvh place-items-center">
        LOADING...
      </div>
    )
  }

  if (data) {
    return (
      <div className="grid text-white bg-darkBackground min-h-dvh place-items-center">
        <Button>BRUH</Button>
      </div>
    );
  }
}
