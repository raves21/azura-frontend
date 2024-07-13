import { createFileRoute } from "@tanstack/react-router";
import {
  useFetchPopularAnimes,
  useFetchRecentlyUpdatedAniwatch,
  useFetchTopRatedAnime,
  useFetchTrendingAnime,
  useFetchTrendingAnimePageTwo,
} from "../../api/animes";
import TrendingAnimesHeroCarousel from "./-TrendingAnimesHeroCarousel";
import TrendingAnimes from "./-TrendingAnimes";
import PopularAnimes from "./-PopularAnimes";
import RecentlyUpdatedAnimes from "./-RecentlyUpdated";
import TopRatedAnimes from "./-TopRatedAnimes";

export const Route = createFileRoute("/home/")({
  component: () => <Home />,
});

function Home() {
  const { data: trendingAnimes, isLoading: isTrendingAnimesLoading } =
    useFetchTrendingAnime(5);
  const {
    data: trendingAnimePageTwo,
    isLoading: isTrendingAnimePageTwoLoading,
  } = useFetchTrendingAnimePageTwo(10);
  const { data: popularAnimes, isLoading: isPopularAnimesLoading } =
    useFetchPopularAnimes(10);

  const { data: topRatedAnimes, isLoading: isTopRatedAnimesLoading } =
    useFetchTopRatedAnime(10);
  // const {data: recentlyUpdatedAnimes, isLoading: isRecentlyUpdatedAnimesLoading} = useFetchRecentlyUpdatedAniwatch()

  if (
    isTrendingAnimePageTwoLoading ||
    isTrendingAnimesLoading ||
    isPopularAnimesLoading ||
    isTopRatedAnimesLoading
    // isRecentlyUpdatedAnimesLoading
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
        <div className="space-y-10">
          <TrendingAnimes animeList={trendingAnimePageTwo.results} />
          <PopularAnimes animeList={popularAnimes.results} />
          <TopRatedAnimes animeList={topRatedAnimes.results} />
          {/* <RecentlyUpdatedAnimes animeList={recentlyUpdatedAnimes.animes}/> */}
        </div>
      </div>
    );
  }
}
