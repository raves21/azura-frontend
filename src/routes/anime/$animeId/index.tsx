import { useFetchAnimeInfoAnify, useFetchAnimeInfoAnilist } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeHeroComponent from "../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { useEffect } from "react";
export const Route = createFileRoute("/anime/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();

  const {
    data: animeInfoAnify,
    isLoading: isAnimeInfoAnifyLoading,
    error: animeInfoAnifyError,
  } = useFetchAnimeInfoAnify(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId, true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoAnifyLoading || isAnimeInfoAnilistLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          {isAnimeInfoAnifyLoading ? (
            <span className="font-semibold text-green-500">ANIFY</span>
          ) : (
            <span className="font-semibold text-blue-500">ANILIST</span>
          )}
        </p>
      </div>
    );
  }

  if (animeInfoAnifyError && animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="w-full">
      <AnimeHeroComponent
        title={
          animeInfoAnify?.title.english ??
          animeInfoAnify?.title.romaji ??
          animeInfoAnilist?.title.english ??
          animeInfoAnilist?.title.romaji
        }
        cover={animeInfoAnify?.bannerImage ?? animeInfoAnilist?.cover}
        image={animeInfoAnilist?.image ?? animeInfoAnify?.coverImage}
        id={animeInfoAnilist?.id ?? animeInfoAnify?.id}
        description={
          animeInfoAnilist?.description ?? animeInfoAnify?.description
        }
        genres={animeInfoAnilist?.genres}
        status={animeInfoAnify?.status ?? animeInfoAnilist?.status}
        totalEpisodes={
          animeInfoAnify?.totalEpisodes ?? animeInfoAnilist?.totalEpisodes
        }
        type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
        year={animeInfoAnilist?.releaseDate ?? animeInfoAnify?.year}
        rating={
          (animeInfoAnify?.rating && animeInfoAnify.rating.anilist) ??
          animeInfoAnilist?.rating! * 0.1 ??
          null
        }
      />
      <Episodes
        type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
        animeInfoAnilist={animeInfoAnilist}
        animeInfoAnify={animeInfoAnify}
        defaultEpisodeImage={
          animeInfoAnify?.coverImage ?? animeInfoAnilist?.cover
        }
      />
    </main>
  );
}
