import { useFetchAnimeEpisodes, useFetchAnimeInfo } from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeInfoPageHero from "./-AnimeInfoPageHero";
import AnimeEpisodes from "@/components/shared/anime/AnimeEpisodes";
import { useEffect } from "react";
import { Genre } from "@/utils/types/animeAnilist";
import CategoryCarousel from "@/components/shared/CategoryCarousel";
import CategoryCarouselItem from "@/components/shared/CategoryCarouselItem";
import MediaCard from "@/components/shared/MediaCard";

const anilistGenres = Object.values(Genre).map((genre) => genre.toString());

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
        <AnimeInfoPageHero
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
          genres={
            animeInfoAnilist?.genres || animeInfoAnify?.genres
              ? animeInfoAnify?.genres.filter((genre) =>
                  anilistGenres.includes(genre)
                )
              : undefined
          }
          status={animeInfoAnilist?.status || animeInfoAnify?.status}
          totalEpisodes={
            animeInfoAnilist?.totalEpisodes || animeInfoAnify?.totalEpisodes
          }
          type={animeInfoAnilist?.type || animeInfoAnify?.format}
          year={animeInfoAnilist?.releaseDate || animeInfoAnify?.year}
          rating={
            animeInfoAnilist?.rating * 0.1 ||
            animeInfoAnify?.rating?.anilist ||
            null
          }
        />
        <AnimeEpisodes
          variant="infoPage"
          episodesQuery={episodesQuery}
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
            <CategoryCarousel
              carouselItems={animeInfoAnilist.recommendations}
              categoryName="Recommendations:"
              renderCarouselItems={(recommendation, i) => {
                return (
                  <CategoryCarouselItem key={recommendation.id || i}>
                    <MediaCard
                      image={recommendation.image || recommendation.cover}
                      linkProps={{
                        to: "/anime/$animeId",
                        params: { animeId: `${recommendation.id}` },
                      }}
                      subLabels={[recommendation.type, recommendation.status]}
                      title={
                        recommendation.title.english ||
                        recommendation.title.romaji ||
                        recommendation.title.userPreferred
                      }
                    />
                  </CategoryCarouselItem>
                );
              }}
            />
          )}
      </main>
    );
  }
}
