import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import { cn } from "@/lib/utils";
import { ServerName } from "@/utils/types/media/shared";
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
  server: ServerName.embed1 | ServerName.embed2;
} & (MovieProps | TVProps);

export default function EmbedVideoPlayer({ tmdbId, server, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let src: string;

  switch (server) {
    case ServerName.embed1:
      if (props.type === "movie") {
        src = `https://vidsrc.cc/v2/embed/movie/${tmdbId}?autoPlay=false`;
      } else {
        src = `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${props.tvSeason}/${props.tvEp}?autoPlay=false`;
      }
      break;
    case ServerName.embed2:
      if (props.type === "movie") {
        src = `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}`;
      } else {
        src = `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${props.tvSeason}&episode=${props.tvEp}`;
      }
      break;
  }
  return (
    <>
      {isLoading && <VideoPlayerSkeleton />}
      {isError && <VideoPlayerError />}
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
