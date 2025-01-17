import {
  AnimeEpisodesData,
  Format
} from "@/utils/types/thirdParty/anime/animeAnilist";
import EpisodeCard from "../shared/episode/EpisodeCard";
import { useChunkAnimeEpisodes } from "@/services/thirdParty/anime/queries/animeQueries";
import { UseQueryResult } from "@tanstack/react-query";
import CustomDropdown from "../../CustomDropdown";
import EpisodesLoading from "../shared/episode/EpisodesLoading";
import EpisodesError from "../shared/episode/EpisodesError";
import EpisodesContainer from "../shared/episode/EpisodesContainer";
import NoEpisodesAvailable from "../shared/episode/NoEpisodesAvailable";
import EpisodesHeader from "../shared/episode/EpisodesHeader";
import EpisodeListContainer from "../shared/episode/EpisodeListContainer";
import { useAnimeEpisodes } from "@/utils/hooks/useAnimeEpisodes";

type AnimeEpisodeProps = {
  variant: "infoPage" | "watchPage";
  animeId: string | undefined;
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
  type: string | undefined;
  replace: boolean;
  episodeImageFallback: string | undefined;
  episodeListMaxHeight?: number;
  currentlyWatchingEpisodeNumber?: number;
};

export default function AnimeEpisodes({
  animeId,
  type,
  replace,
  variant,
  episodesQuery,
  episodeImageFallback,
  episodeListMaxHeight,
  currentlyWatchingEpisodeNumber
}: AnimeEpisodeProps) {
  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError
  } = episodesQuery;

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkAnimeEpisodes(episodes);

  const {
    selectedChunk,
    setSelectedChunk,
    currentlyWatchingEpisodeCardRef,
    episodeListContainerRef
  } = useAnimeEpisodes({
    chunkedEpisodes,
    currentlyWatchingEpisodeNumber
  });

  if (isEpisodesLoading || isChunkEpisodesLoading) {
    return <EpisodesLoading />;
  }

  if (episodesError) {
    return <EpisodesError />;
  }

  if (episodes && chunkedEpisodes) {
    if (variant === "infoPage") {
      return (
        <EpisodesContainer variant="infoPage">
          <EpisodesHeader>
            {chunkedEpisodes.length > 1 && (
              <CustomDropdown
                menuContentClassName="bg-darkBg"
                dropdownTriggerClassName="text-gray-400"
                menuItems={chunkedEpisodes}
                currentlySelected={selectedChunk}
                menuContentMaxHeight={350}
                showMenuContentBorder
                onSelectItem={(epChunk) => setSelectedChunk(epChunk)}
                menuItemLabelNames={chunkedEpisodes.map(
                  (epChunk) => epChunk.label
                )}
              />
            )}
          </EpisodesHeader>
          <EpisodeListContainer variant="infoPage">
            {selectedChunk?.episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  linkProps={{
                    to: `/anime/$animeId/watch`,
                    params: {
                      animeId: animeId
                    },
                    search: {
                      id: episode.id.replace(/^\//, "")
                    }
                  }}
                  episodeNumber={
                    type === Format.MOVIE
                      ? "MOVIE"
                      : `Episode ${episode.number}`
                  }
                  episodeTitle={
                    type !== Format.MOVIE &&
                    episode.title === `Episode ${episode.number}`
                      ? `EP ${episode.number}`
                      : episode.title
                  }
                  isCurrentlyWatched={
                    episode.number === currentlyWatchingEpisodeNumber
                  }
                  episodeImageFallback={episodeImageFallback}
                  replace={replace}
                  image={episode.image}
                  key={i}
                />
              );
            })}
          </EpisodeListContainer>
        </EpisodesContainer>
      );
    } else {
      return (
        <EpisodesContainer
          variant="watchPage"
          episodeListMaxHeight={episodeListMaxHeight}
        >
          <EpisodesHeader>
            {selectedChunk && chunkedEpisodes.length > 1 && (
              <CustomDropdown
                menuContentClassName="bg-darkBg"
                dropdownTriggerClassName="text-gray-400"
                menuItems={chunkedEpisodes}
                currentlySelected={selectedChunk}
                menuContentMaxHeight={350}
                showMenuContentBorder
                onSelectItem={(epChunk) => setSelectedChunk(epChunk)}
                menuItemLabelNames={chunkedEpisodes.map(
                  (epChunk) => epChunk.label
                )}
              />
            )}
          </EpisodesHeader>
          <EpisodeListContainer
            variant="watchPage"
            ref={episodeListContainerRef}
          >
            {selectedChunk &&
              selectedChunk.episodes.map((episode, i) => {
                return (
                  <EpisodeCard
                    ref={
                      episode.number === currentlyWatchingEpisodeNumber
                        ? currentlyWatchingEpisodeCardRef
                        : null
                    }
                    linkProps={{
                      to: `/anime/$animeId/watch`,
                      params: {
                        animeId: animeId
                      },
                      search: {
                        id: episode.id.replace(/^\//, "")
                      }
                    }}
                    episodeNumber={
                      type === Format.MOVIE
                        ? "MOVIE"
                        : `Episode ${episode.number}`
                    }
                    episodeTitle={
                      episode.title === `Episode ${episode.number}`
                        ? `EP ${episode.number}`
                        : episode.title
                    }
                    isCurrentlyWatched={
                      episode.number === currentlyWatchingEpisodeNumber
                    }
                    episodeImageFallback={episodeImageFallback}
                    replace={replace}
                    image={episode.image}
                    key={i}
                  />
                );
              })}
          </EpisodeListContainer>
        </EpisodesContainer>
      );
    }
  }
  return <NoEpisodesAvailable />;
}
