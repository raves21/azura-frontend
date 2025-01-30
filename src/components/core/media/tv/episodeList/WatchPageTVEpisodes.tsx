import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import { useParams, useSearch } from "@tanstack/react-router";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import { getTMDBImageURL } from "@/services/media/sharedFunctions";
import CustomDropdown from "../../../CustomDropdown";
import { useMemo } from "react";
import { useTVSeasonSelectionStore } from "@/utils/stores/useTVSeasonSelectionStore";

type WatchPageTVEpisodesProps = {
  totalSeasons: number;
  episodes: TMDBTVEpisode[];
  episodeListMaxHeight: number;
  coverImage: string | null;
};

export default function WatchPageTVEpisodes({
  totalSeasons,
  episodeListMaxHeight,
  episodes,
  coverImage
}: WatchPageTVEpisodesProps) {
  const { tvId } = useParams({
    from: "/_protected/tv/$tvId/watch/"
  });
  const { epNum, seasonNum } = useSearch({
    from: "/_protected/tv/$tvId/watch/"
  });
  const seasons = useMemo(
    () => Array.from({ length: totalSeasons }).map((_, i) => i + 1),
    []
  );

  const setSelectedSeason = useTVSeasonSelectionStore(
    (state) => state.setSelectedSeason
  );

  return (
    <EpisodesContainer
      variant="watchPage"
      episodeListMaxHeight={episodeListMaxHeight}
    >
      <EpisodesHeader>
        <CustomDropdown
          currentlySelected={seasonNum}
          menuItems={seasons}
          menuItemLabelNames={seasons.map((season) => `Season ${season}`)}
          menuContentMaxHeight={350}
          onSelectItem={(season) => setSelectedSeason(season)}
          showMenuContentBorder
          menuContentClassName="bg-darkBg"
          dropdownTriggerClassName="text-gray-400"
        />
      </EpisodesHeader>
      <EpisodeListContainer variant="watchPage">
        {episodes.map((episode) => {
          return (
            <EpisodeCard
              key={episode.episode_number}
              linkProps={{
                to: "/tv/$tvId/watch",
                params: {
                  tvId
                },
                search: {
                  seasonNum: episode.season_number,
                  epNum: episode.episode_number
                }
              }}
              episodeNumber={`Episode ${episode.episode_number}`}
              episodeTitle={episode.name}
              isCurrentlyWatched={episode.episode_number === epNum}
              episodeImageFallback={coverImage || undefined}
              image={getTMDBImageURL(episode.still_path)}
            />
          );
        })}
      </EpisodeListContainer>
    </EpisodesContainer>
  );
}
