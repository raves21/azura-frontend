import MovieInfoPageHero from "@/components/core/media/movie/MovieInfoPageHero";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  useMovieInfo,
  useMovieRecommendations
} from "@/services/thirdParty/movie/movieQueries";
import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/thirdParty/sharedFunctions";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/movie/$movieId/")({
  component: () => <MovieInfoPage />
});

function MovieInfoPage() {
  const { movieId } = Route.useParams();

  // const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: movieInfo,
    isLoading: isMovieInfoLoading,
    error: movieInfoError
  } = useMovieInfo(movieId);

  const {
    data: movieRecommendations,
    isLoading: isMovieRecommendationsLoading,
    error: movieRecommendationsError
  } = useMovieRecommendations(movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isMovieInfoLoading || isMovieRecommendationsLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-green-500">MOVIE INFO</span>
        </p>
      </div>
    );
  }

  if (movieInfoError || movieRecommendationsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (movieInfo && movieRecommendations) {
    return (
      <main className="w-full pb-32">
        <MovieInfoPageHero
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
        {/* <AnimeEpisodes
          variant="infoPage"
          episodesQuery={episodesQuery}
          animeId={animeId}
          replace={false}
          type={animeInfoAnilist?.type}
          episodeImageFallback={
            animeInfoAnilist?.cover ||
            animeInfoAnify?.coverImage ||
            animeInfoAnilist?.image ||
            animeInfoAnify?.bannerImage
          }
        /> */}
        {movieRecommendations.results.length !== 0 && (
          <CategoryCarousel
            carouselItems={movieRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation) => {
              return (
                <CategoryCarouselItem key={recommendation.id}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{}}
                    subLabels={[
                      getTMDBReleaseYear(recommendation.release_date)
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
