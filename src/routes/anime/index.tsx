import { createFileRoute } from "@tanstack/react-router";
import {
  useFetchPopularAnimes,
  useFetchTopRatedAnime,
  useFetchTrendingAnime,
  useFetchTrendingAnimePageTwo,
} from "../../api/animes";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";
import AnimeCategorySection from "./-AnimeCategorySection";

export const Route = createFileRoute("/anime/")({
  component: () => <Home />,
});

function Home() {
  const { data: trendingAnimes, isLoading: isTrendingAnimesLoading } =
    useFetchTrendingAnime(5);
  const {
    data: trendingAnimePageTwo,
    isLoading: isTrendingAnimePageTwoLoading,
  } = useFetchTrendingAnimePageTwo(12);
  const { data: popularAnimes, isLoading: isPopularAnimesLoading } =
    useFetchPopularAnimes(12);

  const { data: topRatedAnimes, isLoading: isTopRatedAnimesLoading } =
    useFetchTopRatedAnime(12);

  if (
    isTrendingAnimePageTwoLoading ||
    isTrendingAnimesLoading ||
    isPopularAnimesLoading ||
    isTopRatedAnimesLoading
  ) {
    return (
      <div className="grid text-white bg-darkBg min-h-dvh place-items-center">
        LOADING...
      </div>
    );
  }

  if (
    trendingAnimes &&
    trendingAnimePageTwo &&
    popularAnimes &&
    topRatedAnimes
  ) {
    return (
      <div className="bg-darkBg">
        <TrendingAnimesHeroCarousel animeList={trendingAnimes.results} />
        <div className="pb-24 space-y-10">
          <AnimeCategorySection
            animeList={trendingAnimePageTwo.results}
            categoryName="Trending Anime"
          />
          <AnimeCategorySection
            animeList={popularAnimes.results}
            categoryName="All Time Popular"
          />
          <AnimeCategorySection
            animeList={topRatedAnimes.results}
            categoryName="Top Rated Anime"
          />
        </div>
      </div>
    );
  }
}
