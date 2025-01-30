import { MediaScraperResponse } from "@/utils/types/media/shared";
import { UseQueryResult } from "@tanstack/react-query";
import AllEpisodesLoading from "../shared/episode/skeleton/AllEpisodesLoading";
import EpisodeCard from "../shared/episode/EpisodeCard";
import EpisodeListContainer from "../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../shared/episode/EpisodesContainer";
import EpisodesHeader from "../shared/episode/EpisodesHeader";
import NoEpisodesAvailable from "../shared/episode/NoEpisodesAvailable";
import { useParams } from "@tanstack/react-router";

type MovieEpisodeProps = {
  variant: "infoPage" | "watchPage";
  mediaScraperQuery: UseQueryResult<MediaScraperResponse, Error>;
  moviePoster: string | null;
};

export default function MovieEpisode({
  mediaScraperQuery,
  variant,
  moviePoster
}: MovieEpisodeProps) {
  const { movieId } = useParams({
    from:
      variant === "infoPage"
        ? "/_protected/movie/$movieId/"
        : "/_protected/movie/$movieId/watch/"
  });
  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError
  } = mediaScraperQuery;

  if (isMediaScraperLoading) {
    return <AllEpisodesLoading />;
  }

  if (mediaScraperError) {
    return <NoEpisodesAvailable isMovie={true} />;
  }

  if (mediaScraperData) {
    if (variant === "infoPage") {
      return (
        <EpisodesContainer variant="infoPage">
          <EpisodesHeader />
          <EpisodeListContainer variant="infoPage">
            <EpisodeCard
              linkProps={{
                to: "/movie/$movieId/watch",
                params: {
                  movieId
                }
              }}
              episodeNumber={`MOVIE`}
              episodeTitle={"FULL"}
              episodeImageFallback={"/no-image-2.jpg"}
              image={moviePoster}
            />
          </EpisodeListContainer>
        </EpisodesContainer>
      );
    }
    return (
      <EpisodesContainer variant="watchPage">
        <EpisodesHeader />
        <EpisodeListContainer variant="watchPage">
          <EpisodeCard
            linkProps={{
              to: "/movie/$movieId/watch",
              params: {
                movieId
              }
            }}
            episodeNumber={`MOVIE`}
            episodeTitle={"FULL"}
            isCurrentlyWatched={true}
            episodeImageFallback={"/no-image-2.jpg"}
            image={moviePoster}
          />
        </EpisodeListContainer>
      </EpisodesContainer>
    );
  }
  return <NoEpisodesAvailable isMovie={true} />;
}
