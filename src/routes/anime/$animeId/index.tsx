import {
  useFetchAnimeInfoAnilist,
  useFetchAnimeEpisodes,
} from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeHeroComponent from "../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { useEffect } from "react";
import AnimeCategoryCarousel from "../-AnimeCategoryCarousel";
export const Route = createFileRoute("/anime/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();

  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoAnilistLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-green-500">ANIME INFO</span>
        </p>
      </div>
    );
  }

  if (animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfoAnilist) {
    return (
      <main className="w-full pb-32">
        <AnimeHeroComponent
          animeId={animeId}
          title={
            animeInfoAnilist?.title.english ?? animeInfoAnilist?.title.romaji
          }
          cover={
            animeInfoAnilist?.cover
          }
          image={
            animeInfoAnilist?.image
          }
          id={animeId}
          description={animeInfoAnilist?.description}
          genres={animeInfoAnilist?.genres}
          status={animeInfoAnilist?.status}
          totalEpisodes={animeInfoAnilist?.totalEpisodes}
          type={animeInfoAnilist?.type}
          year={animeInfoAnilist?.releaseDate}
          rating={
            animeInfoAnilist?.rating! * 0.1 ??
            // anifyEpisodesQuery?.data?.rating.anilist
            // ??
            null
          }
        />
        <Episodes
          defaultEpisodeImage={
            animeInfoAnilist?.image ?? animeInfoAnilist?.cover
          }
          isEpisodesLoading={isEpisodesLoading}
          episodesError={episodesError}
          episodes={episodes}
          isInfoPage
          animeId={animeId}
          replace={false}
          type={animeInfoAnilist?.type}
        />
        {animeInfoAnilist?.recommendations &&
          animeInfoAnilist?.recommendations.length !== 0 && (
            <AnimeCategoryCarousel
              isInfoPage
              isHomePage={false}
              recommendations={animeInfoAnilist?.recommendations}
              categoryName="Recommendations"
            />
          )}
      </main>
    );
  }
}
