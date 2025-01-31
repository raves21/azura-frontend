import {
  AnimeEpisodesData,
  AnimeFormat
} from "@/utils/types/media/anime/animeAnilist";
import { useChunkAnimeEpisodes } from "@/services/media/anime/queries/animeQueries";
import { UseQueryResult } from "@tanstack/react-query";
import { useAnimeEpisodes } from "@/utils/hooks/useAnimeEpisodes";
import { useParams } from "@tanstack/react-router";
import CustomDropdown from "@/components/core/CustomDropdown";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesError from "../../shared/episode/EpisodesError";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import AllEpisodesLoading from "../../../loadingSkeletons/media/episode/AllEpisodesLoading";
import NoEpisodesAvailable from "../../shared/episode/NoEpisodesAvailable";

type WatchPageAnimeEpisodesProps = {
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
  type: string | undefined;
  replace: boolean;
  episodeImageFallback: string | undefined;
  episodeListMaxHeight?: number;
  currentlyWatchingEpisodeNumber?: number;
};

export default function WatchPageAnimeEpisodes({
  type,
  replace,
  episodesQuery,
  episodeImageFallback,
  episodeListMaxHeight,
  currentlyWatchingEpisodeNumber
}: WatchPageAnimeEpisodesProps) {
  const { animeId } = useParams({
    from: "/_protected/anime/$animeId/watch/"
  });

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
    return <AllEpisodesLoading variant="watchPage" />;
  }

  if (episodesError) {
    return <EpisodesError />;
  }

  if (episodes && chunkedEpisodes) {
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
        <EpisodeListContainer variant="watchPage" ref={episodeListContainerRef}>
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
                    type === AnimeFormat.MOVIE
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
  return <NoEpisodesAvailable />;
}
