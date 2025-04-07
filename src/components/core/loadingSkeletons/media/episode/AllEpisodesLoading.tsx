import { Skeleton } from "@/components/ui/skeleton";
import EpisodeListContainerSkeleton from "./EpisodeListContainerSkeleton";
import EpisodesContainer from "@/components/core/media/shared/episode/EpisodesContainer";

type InfoPageVariant = {
  variant: "infoPage";
};

type WatchPageVariant = {
  variant: "watchPage";
  episodeListMaxHeight?: number;
};

type Props = { isMovie?: boolean } & (InfoPageVariant | WatchPageVariant);

export default function AllEpisodesLoading({
  variant,
  isMovie,
  ...props
}: Props) {
  const watchPageProps =
    variant === "watchPage" ? (props as WatchPageVariant) : null;

  if (variant === "watchPage") {
    return (
      <EpisodesContainer
        variant="watchPage"
        episodeListMaxHeight={watchPageProps?.episodeListMaxHeight}
      >
        <Skeleton className="self-start p-2 text-lg font-semibold   bg-gray-800 lg:text-xl">
          Episodes
        </Skeleton>
        <EpisodeListContainerSkeleton variant="watchPage" isMovie={!!isMovie} />
      </EpisodesContainer>
    );
  } else {
    return (
      <EpisodesContainer variant="infoPage">
        <Skeleton className="self-start p-2 text-lg font-semibold   bg-gray-800 lg:text-xl">
          Episodes
        </Skeleton>
        <EpisodeListContainerSkeleton variant="infoPage" isMovie={!!isMovie} />
      </EpisodesContainer>
    );
  }
}
