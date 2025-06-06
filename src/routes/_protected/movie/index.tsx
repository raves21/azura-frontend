import CategoryCarouselSkeleton from "@/components/core/loadingSkeletons/media/carousel/CategoryCarouselSkeleton";
import TrendingHeroCarouselSkeleton from "@/components/core/loadingSkeletons/media/carousel/TrendingHeroCarouselSkeleton";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import TrendingHeroCarousel from "@/components/core/media/shared/carousel/TrendingHeroCarousel";
import TrendingHeroCarouselItem from "@/components/core/media/shared/carousel/TrendingHeroCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import { useMoviesByCategory } from "@/services/media/movie/queries";
import { getTMDBImageURL, getTMDBReleaseYear } from "@/utils/functions/media/sharedFunctions";
import { MovieSortBy } from "@/utils/types/media/movie/movieTmdb";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/movie/")({
  component: () => <MovieHomePage />,
});

function MovieHomePage() {
  const {
    data: trendingMovies,
    isLoading: isTrendingMoviesLoading,
    error: trendingMoviesError,
  } = useMoviesByCategory({ category: "trending" });
  const {
    data: popularMovies,
    isLoading: isPopularMoviesLoading,
    error: popularMoviesError,
  } = useMoviesByCategory({ category: "popular" });
  const {
    data: topRatedMovies,
    isLoading: isTopRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useMoviesByCategory({ category: "topRated" });

  if (
    isTrendingMoviesLoading ||
    isPopularMoviesLoading ||
    isTopRatedMoviesLoading
  ) {
    return (
      <div className="flex flex-col items-center w-full">
        <TrendingHeroCarouselSkeleton />
        <div className="w-full pt-8 pb-32 space-y-10">
          <CategoryCarouselSkeleton />
        </div>
      </div>
    );
  }

  if (trendingMoviesError && popularMoviesError && topRatedMoviesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {trendingMovies && (
        <div className="w-dvw max-w-[100dvw]">
          <TrendingHeroCarousel
            carouselItems={trendingMovies.results.slice(0, 5)}
            renderCarouselItems={(movie, i) => (
              <TrendingHeroCarouselItem
                key={i}
                media={{
                  id: movie.id.toString(),
                  type: "MOVIE",
                  coverImage: getTMDBImageURL(movie.backdrop_path),
                  description: movie.overview || null,
                  posterImage: getTMDBImageURL(movie.poster_path),
                  rating: movie.vote_average.toString() || null,
                  status: null,
                  title: movie.title || "",
                  year: getTMDBReleaseYear(movie.release_date),
                }}
                backgroundImage={getTMDBImageURL(movie.backdrop_path)}
                posterImage={getTMDBImageURL(movie.poster_path)}
                description={movie.overview}
                title={movie.title}
                trendingRank={i + 1}
                toInfoPageLinkProps={{
                  to: "/movie/$movieId",
                  params: {
                    movieId: movie.id.toString(),
                  },
                }}
              />
            )}
          />
        </div>
      )}
      <div className="w-full pt-8 pb-32 space-y-10">
        {trendingMovies && (
          <CategoryCarousel
            carouselItems={trendingMovies.results.slice(5, 17)}
            renderCarouselItems={(movie, i) => {
              return (
                <CategoryCarouselItem key={movie.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(movie.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: { movieId: movie.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(movie.release_date)]}
                    title={movie.title}
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Trending"
          />
        )}
        {popularMovies && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/movie/catalog",
              search: {
                sortBy: MovieSortBy.POPULARITY_DESC,
              },
            }}
            carouselItems={popularMovies.results.slice(0, 12)}
            renderCarouselItems={(movie, i) => {
              return (
                <CategoryCarouselItem key={movie.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(movie.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: { movieId: movie.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(movie.release_date)]}
                    title={movie.title}
                  />
                </CategoryCarouselItem>
              );
            }}
            categoryName="Currently Popular"
          />
        )}
        {topRatedMovies && (
          <CategoryCarousel
            gotoLinkProps={{
              to: "/movie/catalog",
              search: {
                sortBy: MovieSortBy.VOTE_AVERAGE_DESC,
              },
            }}
            carouselItems={topRatedMovies.results.slice(0, 12)}
            renderCarouselItems={(movie, i) => {
              return (
                <CategoryCarouselItem key={movie.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(movie.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: { movieId: movie.id.toString() },
                    }}
                    subLabels={[getTMDBReleaseYear(movie.release_date)]}
                    title={movie.title}
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
