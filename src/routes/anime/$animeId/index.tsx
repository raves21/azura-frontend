import { useFetchAnimeEpisodes, useFetchAnimeInfo } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeHeroComponent from "../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { useEffect } from "react";
import AnimeCategoryCarousel from "../-AnimeCategoryCarousel";
export const Route = createFileRoute("/anime/$animeId/")({
  component: () => <AnimeInfoPage />,
});

function AnimeInfoPage() {
  const { animeId } = Route.useParams();

  const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-green-500">ANIME INFO</span>
        </p>
      </div>
    );
  }

  if (animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfo) {
    const { animeInfoAnilist, animeInfoAnify } = animeInfo;
    return (
      <main className="w-full pb-32">
        <AnimeHeroComponent
          episodesQuery={episodesQuery}
          animeId={animeId}
          title={
            animeInfoAnilist?.title.english ||
            animeInfoAnilist?.title.romaji ||
            animeInfoAnify?.title.english ||
            animeInfoAnify?.title.romaji
          }
          cover={animeInfoAnify?.bannerImage || animeInfoAnilist?.cover}
          image={animeInfoAnilist?.image || animeInfoAnify?.coverImage}
          description={
            animeInfoAnilist?.description || animeInfoAnify?.description
          }
          genres={animeInfoAnilist?.genres || undefined}
          status={animeInfoAnilist?.status || animeInfoAnify?.status}
          totalEpisodes={
            animeInfoAnilist?.totalEpisodes || animeInfoAnify?.totalEpisodes
          }
          type={animeInfoAnilist?.type || animeInfoAnify?.format}
          year={animeInfoAnilist?.releaseDate || animeInfoAnify?.year}
          rating={
            animeInfoAnilist?.rating * 0.1 ||
            animeInfoAnify?.rating.anilist ||
            null
          }
        />
        <Episodes
          episodesQuery={episodesQuery}
          isInfoPage
          animeId={animeId}
          replace={false}
          type={animeInfoAnilist?.type}
          episodeImageFallback={
            animeInfoAnilist?.cover ||
            animeInfoAnify?.coverImage ||
            animeInfoAnilist?.image ||
            animeInfoAnify?.bannerImage
          }
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
