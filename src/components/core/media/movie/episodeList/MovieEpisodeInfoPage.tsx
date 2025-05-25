import { ServerName } from "@/utils/types/media/shared";
import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import { useParams } from "@tanstack/react-router";

type Props = {
  moviePoster: string | null;
};

export default function MovieEpisodeInfoPage({ moviePoster }: Props) {
  const { movieId } = useParams({
    from: "/_protected/movie/$movieId/",
  });

  const defaultTVMovieServer = localStorage.getItem(
    "defaultTVMovieServer"
  ) as ServerName | null;

  return (
    <EpisodesContainer variant="infoPage">
      <EpisodesHeader />
      <EpisodeListContainer variant="infoPage">
        <EpisodeCard
          linkProps={{
            to: "/movie/$movieId/watch",
            params: {
              movieId,
            },
            search: {
              server: defaultTVMovieServer || ServerName.embed1,
            },
          }}
          episodeNumber={`MOVIE`}
          episodeTitle={"FULL"}
          episodeImageFallback={"/no-image-2.jpg"}
          image={moviePoster}
        />
      </EpisodeListContainer>
    </EpisodesContainer>
  );
}
