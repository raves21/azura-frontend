import { createFileRoute } from "@tanstack/react-router";
import {
  useFetchPopularAnimes,
  useFetchTopRatedAnime,
  useFetchTrendingAnime,
} from "../../api/animes";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";
// import AnimeCategorySection from "./-AnimeCategorySection";
import AnimeCategoryCarousel from "./-AnimeCategoryCarousel";

export const Route = createFileRoute("/anime/")({
  component: () => <Home />,
});

function Home() {
  const { data: trendingAnimes, isLoading: isTrendingAnimesLoading } =
    useFetchTrendingAnime(17, 1);
  const { data: popularAnimes, isLoading: isPopularAnimesLoading } =
    useFetchPopularAnimes(12);

  const { data: topRatedAnimes, isLoading: isTopRatedAnimesLoading } =
    useFetchTopRatedAnime(12);

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

  if (trendingAnimes && popularAnimes && topRatedAnimes) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-dvw">
          <TrendingAnimesHeroCarousel
            animeList={trendingAnimes.results.slice(0, 5)}
          />
        </div>
        <div className="w-full pt-8 pb-24 space-y-10">
          <AnimeCategoryCarousel
            animeList={trendingAnimes.results.slice(3)}
            categoryName="Trending Anime"
          />
          <AnimeCategoryCarousel
            animeList={topRatedAnimes.results}
            categoryName="Top Rated"
          />
          <AnimeCategoryCarousel
            animeList={popularAnimes.results}
            categoryName="All Time Popular"
          />
        </div>
      </div>
    );
  }
}
