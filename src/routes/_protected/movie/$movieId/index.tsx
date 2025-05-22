import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import InfoPageHeroSkeleton from "@/components/core/loadingSkeletons/media/info/InfoPageHeroSkeleton";
import MovieEpisodeInfoPage from "@/components/core/media/movie/episodeList/MovieEpisodeInfoPage";
import MovieInfoPageHero from "@/components/core/media/movie/infoSection/MovieInfoPageHero";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  useMovieInfo,
  useMovieRecommendations,
} from "@/services/media/movie/movieQueries";
import {
  getTMDBImageURL,
  getTMDBReleaseYear,
} from "@/services/media/sharedFunctions";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/movie/$movieId/")({
  component: () => <MovieInfoPage />,
});

function MovieInfoPage() {
  const { movieId } = Route.useParams();

  const {
    data: movieInfo,
    isLoading: isMovieInfoLoading,
    error: movieInfoError,
  } = useMovieInfo(movieId);

  const {
    data: movieRecommendations,
    isLoading: isMovieRecommendationsLoading,
    error: movieRecommendationsError,
  } = useMovieRecommendations(movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  if (isMovieInfoLoading || isMovieRecommendationsLoading) {
    return (
      <main className="w-full pb-32">
        <InfoPageHeroSkeleton />
        <AllEpisodesLoading variant="infoPage" isMovie />
      </main>
    );
  }

  if (movieInfoError || movieRecommendationsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (movieInfo && movieRecommendations) {
    return (
      <main className="w-full pb-32">
        <MovieInfoPageHero
          movieId={movieId}
          cover={getTMDBImageURL(movieInfo.backdrop_path)}
          description={movieInfo.overview}
          genres={movieInfo.genres}
          image={getTMDBImageURL(movieInfo.poster_path)}
          year={getTMDBReleaseYear(movieInfo.release_date)}
          runTime={movieInfo.runtime}
          status={movieInfo.status}
          title={movieInfo.title}
          voteAverage={movieInfo.vote_average}
        />
        <MovieEpisodeInfoPage
          moviePoster={getTMDBImageURL(movieInfo.poster_path)}
        />
        {movieRecommendations.results.length !== 0 && (
          <CategoryCarousel
            carouselItems={movieRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation) => {
              return (
                <CategoryCarouselItem key={recommendation.id}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: {
                        movieId: `${recommendation.id}`,
                      },
                    }}
                    subLabels={[
                      getTMDBReleaseYear(recommendation.release_date),
                    ]}
                    title={recommendation.title}
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
