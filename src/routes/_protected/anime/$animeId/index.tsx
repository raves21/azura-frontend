import { useAnimeEpisodes, useAnimeInfo } from "@/services/media/anime/queries";
import { createFileRoute } from "@tanstack/react-router";
import AnimeInfoPageHero from "@/components/core/media/anime/infoSection/AnimeInfoPageHero";
import { useEffect } from "react";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import InfoPageAnimeEpisodes from "@/components/core/media/anime/episodesList/InfoPageAnimeEpisodes";
import InfoPageHeroSkeleton from "@/components/core/loadingSkeletons/media/info/InfoPageHeroSkeleton";
import { getAnimeRatingInfoPage } from "@/utils/functions/media/sharedFunctions";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";

export const Route = createFileRoute("/_protected/anime/$animeId/")({
  component: () => <AnimeInfoPage />,
});

function AnimeInfoPage() {
  const { animeId } = Route.useParams();

  const episodesQuery = useAnimeEpisodes(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useAnimeInfo({ animeId });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoLoading) {
    return (
      <main className="w-full pb-32">
        <InfoPageHeroSkeleton />
        <AllEpisodesLoading variant="infoPage" />
      </main>
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
    const { animeInfoAnilist } = animeInfo;
    return (
      <main className="w-full pb-32">
        <AnimeInfoPageHero
          title={
            animeInfoAnilist.title?.english ||
            animeInfoAnilist.title?.romaji ||
            animeInfoAnilist.title?.romaji ||
            ""
          }
          episodesQuery={episodesQuery}
          animeId={animeId}
          cover={
            animeInfoAnilist?.cover
            // || animeInfoAniwatch?.info.poster
          }
          image={
            animeInfoAnilist?.image
            // || animeInfoAniwatch?.info.poster
          }
          description={
            animeInfoAnilist?.description
            // || animeInfoAniwatch?.info.description
          }
          genres={animeInfoAnilist?.genres || undefined}
          status={animeInfoAnilist?.status}
          totalEpisodes={animeInfoAnilist?.totalEpisodes}
          type={
            animeInfoAnilist?.type
            // || animeInfoAniwatch?.info.stats.type
          }
          year={animeInfoAnilist?.releaseDate}
          rating={getAnimeRatingInfoPage(
            // animeInfoAniwatch?.moreInfo.malscore
            //   ? parseFloat(animeInfoAniwatch?.moreInfo.malscore)
            //   :
            undefined,
            animeInfoAnilist?.rating,
          )}
        />
        <InfoPageAnimeEpisodes
          episodesQuery={episodesQuery}
          replace={false}
          type={animeInfoAnilist?.type}
          episodeImageFallback={
            animeInfoAnilist?.image || animeInfoAnilist?.cover
            // ||
            // animeInfoAniwatch?.info.poster
          }
        />
        {animeInfoAnilist?.recommendations &&
          animeInfoAnilist?.recommendations.length !== 0 && (
            <CategoryCarousel
              carouselItems={animeInfoAnilist?.recommendations}
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
