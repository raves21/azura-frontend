import { useFetchAnimeInfo } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeHeroComponent from "../../-AnimeHeroComponent";
import Episodes from "./-Episodes";

export const Route = createFileRoute("/anime/info/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();
  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId);

  if (isAnimeInfoLoading) {
    console.log("ROUTE IS LOADING");
    return (
      <div className="grid text-white bg-black h-dvh place-items-center">
        LOADING...
      </div>
    );
  }

  if (animeInfo) {
    console.log("LOADED ROUTE");
    return (
      <div className="relative bg-darkBg">
        <AnimeHeroComponent animeInfo={animeInfo} />
        <Episodes
          episodes={animeInfo.episodes}
          animeCoverImage={animeInfo.cover}
          animePosterImage={animeInfo.image}
        />
      </div>
    );
  }

  if (animeInfoError) {
    return (
      <div className="grid h-screen bg-darkBg place-items-center">ERROR</div>
    );
  }
}
