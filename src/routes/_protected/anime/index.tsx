import CategoryCarousel from "@/components/shared/CategoryCarousel";
import CategoryCarouselItem from "@/components/shared/CategoryCarouselItem";
import MediaCard from "@/components/shared/MediaCard";
import { useFetchAnimesByCategory } from "@/services/thirdParty/animeQueries";
import {
  SortBy,
  AnilistAnimeStatus,
} from "@/utils/types/thirdParty/animeAnilist";
import { createFileRoute } from "@tanstack/react-router";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";

export const Route = createFileRoute("/_protected/anime/")({
  component: () => <AnimeHomePage />,
});

function AnimeHomePage() {
  const {
    data: trendingAnimes,
    isLoading: isTrendingAnimesLoading,
    error: trendingAnimesError,
  } = useFetchAnimesByCategory(
    17,
    SortBy.TRENDING_DESC,
    AnilistAnimeStatus.RELEASING
  );
  const {
    data: popularAnimes,
    isLoading: isPopularAnimesLoading,
    error: popularAnimesError,
  } = useFetchAnimesByCategory(12, SortBy.POPULARITY_DESC);

  const {
    data: topRatedAnimes,
    isLoading: isTopRatedAnimesLoading,
    error: topRatedAnimesError,
  } = useFetchAnimesByCategory(12, SortBy.SCORE_DESC);

  if (
    isTrendingAnimesLoading ||
    isPopularAnimesLoading ||
    isTopRatedAnimesLoading
  ) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-mainAccent">AzuraWatch</span>
        </p>
      </div>
    );
  }

  if (trendingAnimesError && popularAnimesError && topRatedAnimesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {trendingAnimes && (
        <div className="w-dvw max-w-[100dvw]">
          <TrendingAnimesHeroCarousel
            animeList={trendingAnimes.results.slice(0, 5)}
          />
        </div>
      )}
      <div className="w-full pt-8 pb-24 space-y-10">
        {trendingAnimes && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/anime/catalog",
              search: {
                sortBy: SortBy.TRENDING_DESC,
              },
            }}
            carouselItems={trendingAnimes.results.slice(5)}
            renderCarouselItems={(trendingAnime, i) => {
              return (
                <CategoryCarouselItem key={trendingAnime.id || i}>
                  <MediaCard
                    image={trendingAnime.image || trendingAnime.cover}
                    linkProps={{
                      to: "/anime/$animeId",
                      params: { animeId: trendingAnime.id },
                    }}
                    subLabels={[
                      trendingAnime.type,
                      trendingAnime.releaseDate?.toString(),
                      trendingAnime.status,
                    ]}
                    title={
                      trendingAnime.title.english ||
                      trendingAnime.title.romaji ||
                      trendingAnime.title.userPreferred
                    }
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Trending Anime"
          />
        )}
        {topRatedAnimes && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/anime/catalog",
              search: {
                sortBy: SortBy.SCORE_DESC,
              },
            }}
            carouselItems={topRatedAnimes.results}
            renderCarouselItems={(topRatedAnime, i) => {
              return (
                <CategoryCarouselItem key={topRatedAnime.id || i}>
                  <MediaCard
                    image={topRatedAnime.image || topRatedAnime.cover}
                    linkProps={{
                      to: "/anime/$animeId",
                      params: { animeId: topRatedAnime.id },
                    }}
                    subLabels={[
                      topRatedAnime.type,
                      topRatedAnime.releaseDate?.toString(),
                      topRatedAnime.status,
                    ]}
                    title={
                      topRatedAnime.title.english ||
                      topRatedAnime.title.romaji ||
                      topRatedAnime.title.userPreferred
                    }
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Top Rated"
          />
        )}
        {popularAnimes && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/anime/catalog",
              search: {
                sortBy: SortBy.POPULARITY_DESC,
              },
            }}
            carouselItems={popularAnimes.results}
            renderCarouselItems={(popularAnime, i) => {
              return (
                <CategoryCarouselItem key={popularAnime.id || i}>
                  <MediaCard
                    image={popularAnime.image || popularAnime.cover}
                    linkProps={{
                      to: "/anime/$animeId",
                      params: { animeId: popularAnime.id },
                    }}
                    subLabels={[
                      popularAnime.type,
                      popularAnime.releaseDate?.toString(),
                      popularAnime.status,
                    ]}
                    title={
                      popularAnime.title.english ||
                      popularAnime.title.romaji ||
                      popularAnime.title.userPreferred
                    }
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="All Time Popular"
          />
        )}
      </div>
    </div>
  );
}
