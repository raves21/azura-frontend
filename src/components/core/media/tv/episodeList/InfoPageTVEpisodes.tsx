import { UseQueryResult } from "@tanstack/react-query";
import AllEpisodesLoading from "../../../loadingSkeletons/media/episode/AllEpisodesLoading";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import NoEpisodesAvailable from "../../shared/episode/NoEpisodesAvailable";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import EpisodesError from "../../shared/episode/EpisodesError";
import CustomDropdown from "../../../CustomDropdown";
import { getTMDBImageURL } from "@/services/media/sharedFunctions";

type InfoPageTVEpisodesProps = {
  totalSeasons: number | null;
  tvSeasonEpisodesQuery: UseQueryResult<TMDBTVEpisode[], Error>;
  coverImage?: string | null;
};

export default function InfoPageTVEpisodes({
  totalSeasons,
  tvSeasonEpisodesQuery,
  coverImage
}: InfoPageTVEpisodesProps) {
  const { tvId } = useParams({
    from: "/_protected/tv/$tvId/"
  });
  const { s } = useSearch({ from: "/_protected/tv/$tvId/" });
  const navigate = useNavigate();

  const {
    data: tvSeasonEpisodes,
    isLoading: isTvSeasonEpisodesLoading,
    error: tvSeasonEpisodesError
  } = tvSeasonEpisodesQuery;

  if (isTvSeasonEpisodesLoading || !totalSeasons) {
    return <AllEpisodesLoading variant="infoPage" />;
  }

  if (tvSeasonEpisodesError) {
    return <EpisodesError />;
  }

  if (tvSeasonEpisodes && totalSeasons) {
    const seasons = Array.from({ length: totalSeasons }).map((_, i) => i + 1);
    return (
      <EpisodesContainer variant="infoPage">
        <EpisodesHeader>
          <CustomDropdown
            currentlySelected={s || 1}
            menuItems={seasons}
            menuContentMaxHeight={350}
            menuItemLabelNames={seasons.map((season) => `Season ${season}`)}
            onSelectItem={(season) =>
              navigate({
                to: "/tv/$tvId",
                params: { tvId },
                search: { s: season },
                replace: true
              })
            }
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
                    tvSeason: episode.season_number,
                    tvEp: episode.episode_number
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
