import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import { cn } from "@/lib/utils";
import { TVMovieServerName } from "@/utils/types/media/shared";
import { useState } from "react";
import VideoPlayerError from "./VideoPlayerError";

type MovieProps = {
  type: "movie";
};

type TVProps = {
  type: "tv";
  tvEp: number;
  tvSeason: number;
};

type Props = {
  tmdbId: string;
  server: TVMovieServerName.embed1 | TVMovieServerName.embed2;
} & (MovieProps | TVProps);

export default function TVMovieEmbedVideoPlayer({
  tmdbId,
  server,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let src: string;

  switch (server) {
    case TVMovieServerName.embed1:
      if (props.type === "movie") {
        src = `${import.meta.env.VITE_EMBED1_URL}/v2/embed/movie/${tmdbId}?autoPlay=false`;
      } else {
        src = `${import.meta.env.VITE_EMBED1_URL}/v2/embed/tv/${tmdbId}/${props.tvSeason}/${props.tvEp}?autoPlay=false`;
      }
      break;
    case TVMovieServerName.embed2:
      if (props.type === "movie") {
        src = `${import.meta.env.VITE_EMBED2_URL}/embed/movie?tmdb=${tmdbId}`;
      } else {
        src = `${import.meta.env.VITE_EMBED2_URL}/embed/tv?tmdb=${tmdbId}&season=${props.tvSeason}&episode=${props.tvEp}`;
      }
      break;
  }
  return (
    <>
      {isLoading && <VideoPlayerSkeleton />}
      {isError && <VideoPlayerError serverName={server} />}
      <div
        className={cn(
          "w-dvw ml-[calc(-50vw+50%)] relative lg:w-full lg:ml-auto aspect-video rounded-none",
          isLoading || isError ? "hidden" : ""
        )}
      >
        <iframe
          src={src}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
          className="border-0 size-full absolute inset-0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
      </div>
    </>
  );
}
