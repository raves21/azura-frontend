import { MediaScraperResponse } from "@/utils/types/media/shared";
import { QueryKey, UseQueryResult } from "@tanstack/react-query";
import AllEpisodesLoading from "../../shared/episode/skeleton/AllEpisodesLoading";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import NoEpisodesAvailable from "../../shared/episode/NoEpisodesAvailable";
import { useParams } from "@tanstack/react-router";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import EpisodesError from "../../shared/episode/EpisodesError";
import CustomDropdown from "../../../CustomDropdown";
import { getTMDBImageURL } from "@/services/media/sharedFunctions";
import EpisodeListContainerSkeleton from "../../shared/episode/skeleton/EpisodeListContainerSkeleton";
import { queryClient } from "@/utils/variables/queryClient";
import { useTVSeasonSelectionStore } from "@/utils/stores/useTVSeasonSelectionStore";
import { useShallow } from "zustand/react/shallow";

type InfoPageTVEpisodesProps = {
  totalSeasons: number | null;
  tvSeasonEpisodesQuery: UseQueryResult<TMDBTVEpisode[], Error>;
  mediaScraperQuery: UseQueryResult<MediaScraperResponse, Error>;
  coverImage: string | null;
};

export default function InfoPageTVEpisodes({
  totalSeasons,
  tvSeasonEpisodesQuery,
  mediaScraperQuery,
  coverImage
}: InfoPageTVEpisodesProps) {
  const { tvId } = useParams({
    from: "/_protected/tv/$tvId/"
  });

  const [selectedSeason, setSelectedSeason] = useTVSeasonSelectionStore(
    useShallow((state) => [state.selectedSeason, state.setSelectedSeason])
  );

  const {
    data: tvSeasonEpisodes,
    isLoading: isTvSeasonEpisodesLoading,
    error: tvSeasonEpisodesError
  } = tvSeasonEpisodesQuery;

  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError
  } = mediaScraperQuery;

  //this returns an array of queryKeys that matches the provided queryKey below
  const initialEpisodeQueryKeys = queryClient.getQueriesData<
    QueryKey | undefined
  >({ queryKey: ["mediaScraper", "TV", tvId] });

  //this takes the first queryKey in initialEpisodeQueryKeys (an array) and gets that queryKey's cached data
  const initialEpisode = queryClient.getQueryData<MediaScraperResponse>(
    initialEpisodeQueryKeys[0][0]
  );

  if (isTvSeasonEpisodesLoading || isMediaScraperLoading) {
    //oshow the season dropdown selection while loading ONLY if initialEpisode was already fetched, has data, and has been cached
    if (initialEpisode && totalSeasons) {
      const seasons = Array.from({ length: totalSeasons }).map((_, i) => i + 1);
      return (
        <EpisodesContainer variant="infoPage">
          <EpisodesHeader>
            <CustomDropdown
              currentlySelected={selectedSeason || 1}
              menuItems={seasons}
              menuContentMaxHeight={350}
              menuItemLabelNames={seasons.map((season) => `Season ${season}`)}
              onSelectItem={(season) => setSelectedSeason(season)}
              showMenuContentBorder
              menuContentClassName="bg-darkBg"
              dropdownTriggerClassName="text-gray-400"
            />
          </EpisodesHeader>
          <EpisodeListContainerSkeleton variant="infoPage" />
        </EpisodesContainer>
      );
    } else {
      //if no initialEpisode was fetched (this means this is the first time the TV Show is fetched), then show
      //loading page with no season dropdown selection
      return <AllEpisodesLoading variant="infoPage" />;
    }
  }

  if (tvSeasonEpisodesError || !totalSeasons || mediaScraperError) {
    return <EpisodesError />;
  }

  if (tvSeasonEpisodes && mediaScraperData && totalSeasons) {
    const seasons = Array.from({ length: totalSeasons }).map((_, i) => i + 1);
    return (
      <EpisodesContainer variant="infoPage">
        <EpisodesHeader>
          <CustomDropdown
            currentlySelected={selectedSeason || 1}
            menuItems={seasons}
            menuContentMaxHeight={350}
            menuItemLabelNames={seasons.map((season) => `Season ${season}`)}
            onSelectItem={(season) => setSelectedSeason(season)}
            showMenuContentBorder
            menuContentClassName="bg-darkBg"
            dropdownTriggerClassName="text-gray-400"
          />
        </EpisodesHeader>
        <EpisodeListContainer variant="infoPage">
          {tvSeasonEpisodes.map((episode) => {
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
                episodeImageFallback={coverImage || undefined}
                image={getTMDBImageURL(episode.still_path)}
              />
            );
          })}
        </EpisodeListContainer>
      </EpisodesContainer>
    );
  }
  return <NoEpisodesAvailable />;
}
