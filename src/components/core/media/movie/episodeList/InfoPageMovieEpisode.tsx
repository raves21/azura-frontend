import EpisodeCard from "../../shared/episode/EpisodeCard";
import EpisodeListContainer from "../../shared/episode/EpisodeListContainer";
import EpisodesContainer from "../../shared/episode/EpisodesContainer";
import EpisodesHeader from "../../shared/episode/EpisodesHeader";
import { useParams } from "@tanstack/react-router";
import { getDefaultTVMovieServer } from "@/utils/functions/media/sharedFunctions";

type Props = {
  moviePoster: string | null;
};

export default function InfoPageMovieEpisode({ moviePoster }: Props) {
  const { movieId } = useParams({
    from: "/_protected/movie/$movieId/",
  });

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
              server: getDefaultTVMovieServer(),
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
