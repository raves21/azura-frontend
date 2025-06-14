import WatchPageMovieInfo from "@/components/core/media/movie/infoSection/WatchPageMovieInfo";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import VideoPlayer from "@/components/core/media/shared/episode/videoPlayer/VideoPlayer";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  useMovieInfo,
  useMovieRecommendations,
} from "@/services/media/movie/queries";
import { useMediaScraper } from "@/services/media/sharedQueries";
import { createFileRoute } from "@tanstack/react-router";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import EpisodeTitleAndNumberSkeleton from "@/components/core/loadingSkeletons/media/episode/EpisodeTitleAndNumberSkeleton";
import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import WatchInfoPageSkeleton from "@/components/core/loadingSkeletons/media/info/WatchPageInfoSkeleton";
import VideoPlayerError from "@/components/core/media/shared/episode/videoPlayer/VideoPlayerError";
import TVMovieEmbedVideoPlayer from "@/components/core/media/shared/episode/videoPlayer/TVMovieEmbedVideoPlayer";
import { TVMovieServerName } from "@/utils/types/media/shared";
import { z } from "zod";
import WatchPageMovieEpisode from "@/components/core/media/movie/episodeList/WatchPageMovieEpisode";
import {
  getDefaultTVMovieServer,
  getTMDBImageURL,
  getTMDBReleaseYear,
} from "@/utils/functions/media/sharedFunctions";

const watchMoviePageSchema = z.object({
  server: z.nativeEnum(TVMovieServerName).catch(getDefaultTVMovieServer()),
});

type WatchMoviePageSchema = z.infer<typeof watchMoviePageSchema>;

export const Route = createFileRoute("/_protected/movie/$movieId/watch/")({
  component: () => <WatchMoviePage />,
  validateSearch: (search): WatchMoviePageSchema => {
    const validated = watchMoviePageSchema.safeParse(search);
    if (validated.success) {
      return validated.data;
    }
    return { server: getDefaultTVMovieServer() };
  },
});

function WatchMoviePage() {
  const { movieId } = Route.useParams();
  const { server } = Route.useSearch();

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

  const mediaScraperQuery = useMediaScraper({
    type: "MOVIE",
    enabled: !!movieInfo,
    mediaId: movieId,
  });

  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError,
  } = mediaScraperQuery;

  if (
    isMediaScraperLoading &&
    (isMovieInfoLoading || isMovieRecommendationsLoading)
  ) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div className="w-full h-fit">
            <VideoPlayerSkeleton />
            <EpisodeTitleAndNumberSkeleton />
          </div>
          <AllEpisodesLoading variant="watchPage" isMovie />
        </section>
        <WatchInfoPageSkeleton />
      </main>
    );
  }
  if (mediaScraperError && (movieInfoError || movieRecommendationsError)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (movieInfo) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div className="w-full h-fit">
            {server === TVMovieServerName.embed1 ||
            server === TVMovieServerName.embed2 ? (
              <TVMovieEmbedVideoPlayer
                server={server}
                tmdbId={movieId}
                type="movie"
              />
            ) : mediaScraperData && server === TVMovieServerName.azuraMain ? (
              <VideoPlayer
                mediaType="MOVIE"
                poster={getTMDBImageURL(movieInfo.backdrop_path)}
                streamLink={
                  mediaScraperData.url ? mediaScraperData.url[0].link : null
                }
                subtitleTracks={mediaScraperData.tracks}
                headers={mediaScraperData.headers}
                title={movieInfo.title}
              />
            ) : isMediaScraperLoading ? (
              <VideoPlayerSkeleton />
            ) : (
              <VideoPlayerError serverName={server} />
            )}
            <EpisodeTitleAndNumber
              episodeNumber={movieInfo.title}
              episodeTitle={getTMDBReleaseYear(movieInfo.release_date)}
            />
          </div>
          <WatchPageMovieEpisode
            moviePoster={getTMDBImageURL(movieInfo.poster_path)}
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
                      params: { movieId: `${recommendation.id}` },
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
