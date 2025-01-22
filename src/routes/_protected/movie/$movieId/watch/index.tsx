import WatchPageMovieInfo from "@/components/core/media/movie/WatrchPageMovieInfo";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import EpisodeCard from "@/components/core/media/shared/episode/EpisodeCard";
import EpisodeListContainer from "@/components/core/media/shared/episode/EpisodeListContainer";
import EpisodesContainer from "@/components/core/media/shared/episode/EpisodesContainer";
import EpisodesHeader from "@/components/core/media/shared/episode/EpisodesHeader";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import { VideoPlayer } from "@/components/core/media/shared/episode/VideoPlayer";
import MediaCard from "@/components/core/media/shared/MediaCard";
import {
  useMovieInfo,
  useMovieStreamLink,
  useMovieRecommendations
} from "@/services/thirdParty/movie/movieQueries";
import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/thirdParty/sharedFunctions";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/_protected/movie/$movieId/watch/")({
  component: () => <WatchMoviePage />
});

function WatchMoviePage() {
  const { movieId } = Route.useParams();
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight
  ] = useState(0);

  const windowWidth = useWindowWidth();

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

  const {
    data: movieStreamLink,
    isLoading: isMovieStreamLinkLoading,
    error: movieStreamLinkError
  } = useMovieStreamLink(movieId, !!movieInfo);

  //sets the videoAndEpisodeInfoContainerHeight everytime window width changes
  useEffect(() => {
    if (videoAndEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndEpisodeInfoContainerRef.current.getBoundingClientRect().height
      );
    }
  }, [movieStreamLink, movieInfo, windowWidth]);

  if (
    isMovieStreamLinkLoading ||
    isMovieInfoLoading ||
    isMovieRecommendationsLoading
  ) {
    return (
      <div className="grid text-2xl text-white h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-red-500">EPISODE</span>
        </p>
      </div>
    );
  }
  if (movieStreamLinkError || movieInfoError || movieRecommendationsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this movie.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (movieStreamLink && movieInfo) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            <VideoPlayer streamLink={movieStreamLink} title={"MOVIE"} />
            <EpisodeTitleAndNumber
              episodeNumber={movieInfo.title}
              episodeTitle={"MOVIE"}
            />
          </div>
          <EpisodesContainer
            variant="watchPage"
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
          >
            <EpisodesHeader />
            <EpisodeListContainer variant="watchPage">
              <EpisodeCard
                episodeNumber={`MOVIE`}
                episodeTitle={"FULL"}
                isCurrentlyWatched={true}
                episodeImageFallback={"/no-image-2.jpg"}
                image={getTMDBImageURL(movieInfo.poster_path)}
              />
            </EpisodeListContainer>
          </EpisodesContainer>
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
                      to: "/anime/$animeId",
                      params: { animeId: `${recommendation.id}` }
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
