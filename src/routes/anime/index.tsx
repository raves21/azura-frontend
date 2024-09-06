import { createFileRoute } from "@tanstack/react-router";
import {
  useFetchPopularAnimes,
  useFetchTopRatedAnime,
  useFetchTrendingAnime,
} from "../../api/animes";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";
import AnimeCategoryCarousel from "./-AnimeCategoryCarousel";
import { SortBy } from "@/utils/types/animeAnilist";

export const Route = createFileRoute("/anime/")({
  component: () => <Home />,
});

function Home() {
  const {
    data: trendingAnimes,
    isLoading: isTrendingAnimesLoading,
    error: trendingAnimesError,
  } = useFetchTrendingAnime(17, 1);
  const {
    data: popularAnimes,
    isLoading: isPopularAnimesLoading,
    error: popularAnimesError,
  } = useFetchPopularAnimes(12);

  const {
    data: topRatedAnimes,
    isLoading: isTopRatedAnimesLoading,
    error: topRatedAnimesError,
  } = useFetchTopRatedAnime(12);

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

  if (trendingAnimesError || popularAnimesError || topRatedAnimesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (trendingAnimes && popularAnimes && topRatedAnimes) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-dvw max-w-[100dvw]">
          <TrendingAnimesHeroCarousel
            animeList={trendingAnimes.results.slice(0, 5)}
          />
        </div>
        <div className="w-full pt-8 pb-24 space-y-10">
          <AnimeCategoryCarousel
            seeAllSortBy={SortBy.TRENDING_DESC}
            isHomePage
            animeList={trendingAnimes.results.slice(3)}
            categoryName="Trending Anime"
          />
          <AnimeCategoryCarousel
            seeAllSortBy={SortBy.SCORE_DESC}
            isHomePage
            animeList={topRatedAnimes.results}
            categoryName="Top Rated"
          />
          <AnimeCategoryCarousel
            seeAllSortBy={SortBy.POPULARITY_DESC}
            isHomePage
            animeList={popularAnimes.results}
            categoryName="All Time Popular"
          />
        </div>
      </div>
    );
  }
}
