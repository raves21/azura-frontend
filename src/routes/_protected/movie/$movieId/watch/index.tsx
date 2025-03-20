import MovieEpisode from "@/components/core/media/movie/episodeList/MovieEpisode";
import WatchPageMovieInfo from "@/components/core/media/movie/infoSection/WatchPageMovieInfo";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import VideoPlayer from "@/components/core/media/shared/episode/VideoPlayer";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  useMovieInfo,
  useMovieRecommendations
} from "@/services/media/movie/movieQueries";
import { useMediaScraper } from "@/services/media/sharedFunctions";
import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/media/sharedFunctions";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import EpisodeTitleAndNumberSkeleton from "@/components/core/loadingSkeletons/media/episode/EpisodeTitleAndNumberSkeleton";
import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import WatchInfoPageSkeleton from "@/components/core/loadingSkeletons/media/info/WatchPageInfoSkeleton";

export const Route = createFileRoute("/_protected/movie/$movieId/watch/")({
  component: () => <WatchMoviePage />
});

function WatchMoviePage() {
  const { movieId } = Route.useParams();
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);

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

  const mediaScraperQuery = useMediaScraper({
    type: "MOVIE",
    enabled: !!movieInfo,
    mediaId: movieId
  });

  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError
  } = mediaScraperQuery;

  if (
    isMediaScraperLoading ||
    isMovieInfoLoading ||
    isMovieRecommendationsLoading
  ) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            <VideoPlayerSkeleton />
            <EpisodeTitleAndNumberSkeleton />
          </div>
          <AllEpisodesLoading variant="watchPage" isMovie />
        </section>
        <WatchInfoPageSkeleton />
      </main>
    );
  }
  if (
    mediaScraperError ||
    movieInfoError ||
    movieRecommendationsError ||
    //if media is not available, response is: {"message": "Sorry, the media isn't available ATM"}
    mediaScraperData?.message
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (mediaScraperData && movieInfo && !mediaScraperData.message) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            <VideoPlayer
              subtitleTracks={mediaScraperData.tracks}
              poster={getTMDBImageURL(movieInfo.backdrop_path)}
              headers={mediaScraperData.headers}
              streamLink={mediaScraperData.url ? mediaScraperData.url[0].link : undefined}
              title={movieInfo.title}
            />
            <EpisodeTitleAndNumber
              episodeNumber={movieInfo.title}
              episodeTitle={getTMDBReleaseYear(movieInfo.release_date)}
            />
          </div>
          <MovieEpisode
            mediaScraperQuery={mediaScraperQuery}
            moviePoster={getTMDBImageURL(movieInfo.poster_path)}
            variant="watchPage"
          />
        </section>
        <WatchPageMovieInfo
          voteAverage={movieInfo.vote_average}
          cover={getTMDBImageURL(movieInfo.backdrop_path)}
          description={movieInfo.overview}
          genres={movieInfo.genres}
          image={getTMDBImageURL(movieInfo.poster_path)}
          runTime={movieInfo.runtime}
          status={movieInfo.status}
          title={movieInfo.title}
          year={getTMDBReleaseYear(movieInfo.release_date)}
        />
        {movieRecommendations && (
          <CategoryCarousel
            carouselItems={movieRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation, i) => {
              return (
                <CategoryCarouselItem key={recommendation.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: { movieId: `${recommendation.id}` }
                    }}
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
