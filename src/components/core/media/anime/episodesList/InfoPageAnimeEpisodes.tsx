import {
  AnimeEpisodesData,
  AnimeFormat
} from "@/utils/types/media/anime/animeAnilist";
import { useChunkAnimeEpisodes } from "@/services/media/anime/queries/animeQueries";
import { UseQueryResult } from "@tanstack/react-query";
import { useAnimeEpisodes } from "@/utils/hooks/useAnimeEpisodes";
import { useParams } from "@tanstack/react-router";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import CustomDropdown from "@/components/core/CustomDropdown";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import NoEpisodesAvailable from "../../shared/episode/NoEpisodesAvailable";
import EpisodesError from "../../shared/episode/EpisodesError";
import { Skeleton } from "@/components/ui/skeleton";
import EpisodeListContainerSkeleton from "../../shared/episode/skeleton/EpisodeListContainerSkeleton";

type InfoPageAnimeEpisodesProps = {
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
  type: string | undefined;
  replace: boolean;
  episodeImageFallback: string | undefined;
  episodeListMaxHeight?: number;
  currentlyWatchingEpisodeNumber?: number;
};

export default function InfoPageAnimeEpisodes({
  type,
  replace,
  episodesQuery,
  episodeImageFallback,
  currentlyWatchingEpisodeNumber
}: InfoPageAnimeEpisodesProps) {
  const { animeId } = useParams({
    from: "/_protected/anime/$animeId/"
  });

  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError
  } = episodesQuery;

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkAnimeEpisodes(episodes);

  const { selectedChunk, setSelectedChunk } = useAnimeEpisodes({
    chunkedEpisodes,
    currentlyWatchingEpisodeNumber
  });

  if (isEpisodesLoading || isChunkEpisodesLoading) {
    return (
      <EpisodesContainer variant="infoPage">
        <EpisodesHeader>
          <Skeleton className="px-3 py-2 text-transparent bg-gray-800 rounded-full">
            30 - 60
          </Skeleton>
        </EpisodesHeader>
        <EpisodeListContainerSkeleton variant="infoPage" />
      </EpisodesContainer>
    );
  }

  if (episodesError) {
    return <EpisodesError />;
  }

  if (episodes && chunkedEpisodes) {
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
          {selectedChunk?.episodes.map((episode, i) => (
            <EpisodeCard
              linkProps={{
                to: `/anime/$animeId/watch`,
                params: {
                  animeId
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
                type !== AnimeFormat.MOVIE &&
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
          ))}
        </EpisodeListContainer>
      </EpisodesContainer>
    );
  }
  return <NoEpisodesAvailable />;
}
