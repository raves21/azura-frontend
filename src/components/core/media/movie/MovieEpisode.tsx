import { RabbitScraperResponse } from "@/utils/types/thirdParty/shared";
import { UseQueryResult } from "@tanstack/react-query";
import EpisodesLoading from "../shared/episode/EpisodesLoading";
import EpisodesError from "../shared/episode/EpisodesError";
import EpisodeCard from "../shared/episode/EpisodeCard";
import EpisodeListContainer from "../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../shared/episode/EpisodesContainer";
import EpisodesHeader from "../shared/episode/EpisodesHeader";
import NoEpisodesAvailable from "../shared/episode/NoEpisodesAvailable";

type MovieEpisodeProps = {
  variant: "infoPage" | "watchPage";
  mediaScraperQuery: UseQueryResult<RabbitScraperResponse, Error>;
  moviePoster: string | null;
};

export default function MovieEpisode({
  mediaScraperQuery,
  variant,
  moviePoster
}: MovieEpisodeProps) {
  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError
  } = mediaScraperQuery;

  if (isMediaScraperLoading) {
    return <EpisodesLoading />;
  }

  if (mediaScraperError) {
    return <EpisodesError isMovie />;
  }

  if (mediaScraperData) {
    if (variant === "infoPage") {
      return (
        <EpisodesContainer variant="infoPage">
          <EpisodesHeader />
          <EpisodeListContainer variant="infoPage">
            <EpisodeCard
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
