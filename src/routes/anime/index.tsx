import { createFileRoute } from "@tanstack/react-router";
import {
  useFetchPopularAnimes,
  useFetchTopRatedAnime,
  useFetchTrendingAnime,
} from "../../api/animes";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";
import AnimeCategorySection from "./-AnimeCategorySection";

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
    // isTrendingAnimePageTwoLoading ||
    isTrendingAnimesLoading ||
    isPopularAnimesLoading ||
    isTopRatedAnimesLoading
  ) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading{" "}
          <span className="font-semibold text-mainAccent">AzuraAnime</span>
        </p>
      </div>
    );
  }

  if (
    trendingAnimes &&
    // trendingAnimePageTwo &&
    popularAnimes &&
    topRatedAnimes
  ) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-dvw">
          <TrendingAnimesHeroCarousel
            animeList={trendingAnimes.results.slice(0, 5)}
          />
        </div>
        <div className="pb-24 space-y-10">
          <AnimeCategorySection
            animeList={trendingAnimes.results.slice(5)}
            categoryName="Trending Anime"
          />
          <AnimeCategorySection
            animeList={topRatedAnimes.results}
            categoryName="Top Rated Anime"
          />
          <AnimeCategorySection
            animeList={popularAnimes.results}
            categoryName="All Time Popular"
          />
        </div>
      </div>
    );
  }
}
