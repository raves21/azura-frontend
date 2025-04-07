import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import TrendingHeroCarousel from "@/components/core/media/shared/carousel/TrendingHeroCarousel";
import TrendingHeroCarouselItem from "@/components/core/media/shared/carousel/TrendingHeroCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  getTMDBImageURL,
  getTMDBReleaseYear,
} from "@/services/media/sharedFunctions";
import { useTVByCategory } from "@/services/media/tv/tvQueries";
import { TVSortBy } from "@/utils/types/media/TV/tvShowTmdb";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/tv/")({
  component: () => <TVHomePage />,
});

function TVHomePage() {
  const {
    data: trendingTV,
    isLoading: isTrendingTVLoading,
    error: trendingTVError,
  } = useTVByCategory("trending");
  const {
    data: popularTV,
    isLoading: isPopularTVLoading,
    error: popularTVError,
  } = useTVByCategory("popular");
  const {
    data: topRatedTV,
    isLoading: isTopRatedTVLoading,
    error: topRatedTVError,
  } = useTVByCategory("topRated");

  if (isTrendingTVLoading || isPopularTVLoading || isTopRatedTVLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-mainAccent">Azura TV</span>
        </p>
      </div>
    );
  }

  if (trendingTVError && popularTVError && topRatedTVError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {trendingTV && (
        <div className="w-dvw max-w-[100dvw]">
          <TrendingHeroCarousel
            carouselItems={trendingTV.results.slice(0, 5)}
            renderCarouselItems={(tv, i) => (
              <TrendingHeroCarouselItem
                key={i}
                backgroundImage={getTMDBImageURL(tv.backdrop_path)}
                posterImage={getTMDBImageURL(tv.poster_path)}
                description={tv.overview}
                title={tv.name}
                trendingRank={i + 1}
                toInfoPageLinkProps={{
                  to: "/tv/$tvId",
                  params: {
                    tvId: tv.id.toString(),
                  },
                }}
              />
            )}
          />
        </div>
      )}
      <div className="w-full pt-8 pb-24 space-y-10">
        {trendingTV && (
          <CategoryCarousel
            carouselItems={trendingTV.results.slice(5, 17)}
            renderCarouselItems={(tv, i) => {
              return (
                <CategoryCarouselItem key={tv.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(tv.poster_path)}
                    linkProps={{
                      to: "/tv/$tvId",
                      params: { tvId: tv.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(tv.first_air_date)]}
                    title={tv.name}
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Trending"
          />
        )}
        {popularTV && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/tv/catalog",
              search: {
                sortBy: TVSortBy.POPULARITY_DESC,
              },
            }}
            carouselItems={popularTV.results.slice(0, 12)}
            renderCarouselItems={(tv, i) => {
              return (
                <CategoryCarouselItem key={tv.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(tv.poster_path)}
                    linkProps={{
                      to: "/tv/$tvId",
                      params: { tvId: tv.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(tv.first_air_date)]}
                    title={tv.name}
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Currently Popular"
          />
        )}
        {topRatedTV && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/tv/catalog",
              search: {
                sortBy: TVSortBy.VOTE_AVERAGE_DESC,
              },
            }}
            carouselItems={topRatedTV.results.slice(0, 12)}
            renderCarouselItems={(tv, i) => {
              return (
                <CategoryCarouselItem key={tv.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(tv.poster_path)}
                    linkProps={{
                      to: "/tv/$tvId",
                      params: { tvId: tv.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(tv.first_air_date)]}
                    title={tv.name}
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Top Rated"
          />
        )}
      </div>
    </div>
  );
}
