import {
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
} from "@/services/media/anime/queries/animeQueries";
import { createFileRoute } from "@tanstack/react-router";
import AnimeInfoPageHero from "@/components/core/media/anime/infoSection/AnimeInfoPageHero";
import { useEffect } from "react";
// import { AnimeGenre } from "@/utils/types/media/anime/animeAnilist";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import InfoPageAnimeEpisodes from "@/components/core/media/anime/episodesList/InfoPageAnimeEpisodes";
import InfoPageHeroSkeleton from "@/components/core/loadingSkeletons/media/info/InfoPageHeroSkeleton";

// const anilistGenres = Object.values(AnimeGenre).map((genre) =>
//   genre.toString()
// );
//
export const Route = createFileRoute("/_protected/anime/$animeId/")({
  component: () => <AnimeInfoPage />,
});

function AnimeInfoPage() {
  const { animeId } = Route.useParams();

  const episodesQuery = useFetchAnimeEpisodes(animeId);

  // const {
  //   data: animeInfo,
  //   isLoading: isAnimeInfoLoading,
  //   error: animeInfoError,
  // } = useFetchAnimeInfo(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [animeId]);

  if (isAnimeInfoLoading) {
    return (
      <main className="w-full pb-32">
        <InfoPageHeroSkeleton />
        <InfoPageAnimeEpisodes
          episodeImageFallback={undefined}
          episodesQuery={episodesQuery}
          replace={false}
          type="TV"
        />
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
    // const {animeInfoAnilist, animeInfoAnify} = animeInfo
    return (
      <main className="w-full pb-32">
        <AnimeInfoPageHero
          episodesQuery={episodesQuery}
          animeId={animeId}
          title={animeInfo.title.english || animeInfo.title.romaji || "N/A"}
          cover={
            // animeInfoAnify?.bannerImage ||
            animeInfo.cover
          }
          image={
            animeInfo.image
            // || animeInfoAnify?.coverImage
          }
          description={
            animeInfo.description
            // || animeInfoAnify?.description
          }
          genres={
            animeInfo.genres ||
            // animeInfoAnify?.genres?.filter((anifyGenre) =>
            //   anilistGenres.includes(anifyGenre)
            // ) ||
            undefined
          }
          status={
            animeInfo.status
            // || animeInfoAnify?.status
          }
          totalEpisodes={
            animeInfo.totalEpisodes
            //  || animeInfoAnify?.totalEpisodes
          }
          type={
            animeInfo.type
            // || animeInfoAnify?.format
          }
          year={
            animeInfo.releaseDate
            // || animeInfoAnify?.year
          }
          rating={
            parseInt((animeInfo.rating * 0.1).toFixed(1)) ||
            // animeInfoAnify?.rating?.anilist ||
            null
          }
        />
        <InfoPageAnimeEpisodes
          episodesQuery={episodesQuery}
          replace={false}
          type={animeInfo.type}
          episodeImageFallback={
            animeInfo.cover ||
            // animeInfoAnify?.coverImage ||
            animeInfo.image
            // || animeInfoAnify?.bannerImage
          }
        />
        {animeInfo.recommendations &&
          animeInfo.recommendations.length !== 0 && (
            <CategoryCarousel
              carouselItems={animeInfo.recommendations}
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
