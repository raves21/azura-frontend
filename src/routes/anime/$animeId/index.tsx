import { useChunkEpisodes, useFetchAnimeInfo } from "@/api/animes";
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
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId);

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(animeInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoLoading || isChunkEpisodesLoading) {
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
          title={
            animeInfoAnify.title.english ??
            animeInfoAnify.title.romaji ??
            animeInfoAnilist.title.english ??
            animeInfoAnilist.title.romaji
          }
          cover={animeInfoAnify.bannerImage ?? animeInfoAnilist.cover}
          image={animeInfoAnilist.image ?? animeInfoAnify.coverImage}
          id={animeInfoAnilist.id ?? animeInfoAnify.id}
          description={
            animeInfoAnilist.description ?? animeInfoAnify.description
          }
          genres={animeInfoAnilist.genres}
          status={animeInfoAnify.status ?? animeInfoAnilist.status}
          totalEpisodes={
            animeInfoAnify.totalEpisodes ?? animeInfoAnilist.totalEpisodes
          }
          type={animeInfoAnilist.type ?? animeInfoAnify.format}
          year={animeInfoAnilist.releaseDate ?? animeInfoAnify.year}
          rating={
            animeInfoAnify.rating.anilist ??
            animeInfoAnilist.rating! * 0.1 ??
            null
          }
        />
        <Episodes
          isInfoPage
          animeId={animeInfoAnify.id ?? animeInfoAnilist.id}
          chunkedEpisodes={chunkedEpisodes}
          replace={false}
          type={animeInfoAnilist.type ?? animeInfoAnify.format}
          defaultEpisodeImage={
            animeInfoAnify.coverImage ?? animeInfoAnilist.cover
          }
        />
        {animeInfoAnilist.recommendations && (
          <AnimeCategoryCarousel
            isInfoPage
            isHomePage={false}
            recommendations={animeInfoAnilist.recommendations}
            categoryName="Recommendations"
          />
        )}
      </main>
    );
  }
}
