import CustomDropdown from "@/components/core/shared/CustomDropdown";
import { serverNames } from "@/utils/variables/media/shared";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

type Props = {
  moviePoster: string | null;
};

export default function MovieEpisodeWatchPage({ moviePoster }: Props) {
  const { movieId } = useParams({
    from: "/_protected/movie/$movieId/watch/",
  });

  const { server } = useSearch({ from: "/_protected/movie/$movieId/watch/" });
  const navigate = useNavigate();

  return (
    <EpisodesContainer variant="watchPage">
      <EpisodesHeader showEpisodesLabel={false} className="justify-end">
        <CustomDropdown
          currentlySelected={server}
          menuItems={serverNames}
          menuContentMaxHeight={350}
          onSelectItem={(serverName) =>
            navigate({
              to: "/movie/$movieId/watch",
              search: {
                server: serverName,
              },
              params: {
                movieId,
              },
            })
          }
          showMenuContentBorder
          menuContentClassName="bg-darkBg"
          dropdownTriggerClassName="text-gray-400"
        />
      </EpisodesHeader>
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
