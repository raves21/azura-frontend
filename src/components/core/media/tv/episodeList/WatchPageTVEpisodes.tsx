import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import { getTMDBImageURL } from "@/utils/functions/media/sharedFunctions";
import CustomDropdown from "../../../shared/CustomDropdown";
import { tvMovieserverNames as tvMovieserverNames } from "@/utils/variables/media/shared";

type Props = {
  totalSeasons: number;
  episodes: TMDBTVEpisode[];
  episodeListMaxHeight: number;
  coverImage: string | null;
  selectedSeason: number;
  setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;
};

export default function WatchPageTVEpisodes({
  totalSeasons,
  episodeListMaxHeight,
  episodes,
  coverImage,
  selectedSeason,
  setSelectedSeason,
}: Props) {
  const { tvId } = useParams({
    from: "/_protected/tv/$tvId/watch/",
  });
  const { tvEp, tvSeason, server } = useSearch({
    from: "/_protected/tv/$tvId/watch/",
  });
  const seasons = Array.from({ length: totalSeasons }).map((_, i) => i + 1);

  const navigate = useNavigate();

  return (
    <EpisodesContainer
      variant="watchPage"
      episodeListMaxHeight={episodeListMaxHeight}
    >
      <EpisodesHeader className="justify-end gap-4" showEpisodesLabel={false}>
        <CustomDropdown
          currentlySelected={server}
          menuItems={tvMovieserverNames}
          menuContentMaxHeight={350}
          onSelectItem={(serverName) =>
            navigate({
              to: "/tv/$tvId/watch",
              search: {
                tvEp,
                tvSeason,
                server: serverName,
              },
              params: {
                tvId,
              },
            })
          }
          showMenuContentBorder
          menuContentClassName="bg-darkBg"
          dropdownTriggerClassName="text-gray-400"
        />
        <CustomDropdown
          currentlySelected={selectedSeason}
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
                  tvId,
                },
                search: {
                  tvSeason: episode.season_number,
                  tvEp: episode.episode_number,
                  server,
                },
                replace: true,
              }}
              episodeNumber={`Episode ${episode.episode_number}`}
              episodeTitle={episode.name}
              isCurrentlyWatched={
                episode.episode_number === tvEp &&
                episode.season_number === tvSeason
              }
              episodeImageFallback={coverImage || undefined}
              image={getTMDBImageURL(episode.still_path)}
            />
          );
        })}
      </EpisodeListContainer>
    </EpisodesContainer>
  );
}
