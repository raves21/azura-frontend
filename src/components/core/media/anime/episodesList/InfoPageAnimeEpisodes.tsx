import { AnimeFormat } from "@/utils/types/media/anime/animeAnilist";
import { useChunkAnimeEpisodes } from "@/services/media/anime/queries";
import { UseQueryResult } from "@tanstack/react-query";
import { useAnimeEpisodes } from "@/utils/hooks/useAnimeEpisodes";
import { useParams } from "@tanstack/react-router";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import CustomDropdown from "@/components/core/shared/CustomDropdown";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import NoEpisodesAvailable from "../../shared/episode/NoEpisodesAvailable";
import EpisodesError from "../../shared/episode/EpisodesError";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import { AnimeEpisodesData } from "@/utils/types/media/anime/shared";
import { getDefaultAnimeServer } from "@/utils/functions/media/sharedFunctions";

type Props = {
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
  type: string | undefined;
  replace: boolean;
  title: string;
  titleLang: "eng" | "jap";
  episodeImageFallback: string | undefined;
  episodeListMaxHeight?: number;
  currentlyWatchingEpisodeNumber?: number;
};

export default function InfoPageAnimeEpisodes({
  type,
  replace,
  episodesQuery,
  title,
  titleLang,
  episodeImageFallback,
  currentlyWatchingEpisodeNumber,
}: Props) {
  const { animeId } = useParams({
    from: "/_protected/anime/$animeId/",
  });

  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = episodesQuery;

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkAnimeEpisodes(episodes);

  const { selectedChunk, setSelectedChunk } = useAnimeEpisodes({
    chunkedEpisodes,
    currentlyWatchingEpisodeNumber,
  });

  if (isEpisodesLoading || isChunkEpisodesLoading) {
    return <AllEpisodesLoading variant="infoPage" />;
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
                  animeId,
                },
                search: {
                  id: episode.id.replace(/^\//, ""),
                  title,
                  lang: titleLang,
                  epNum: episode.number,
                  animeServer: getDefaultAnimeServer(),
                },
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
