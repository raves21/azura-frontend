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
