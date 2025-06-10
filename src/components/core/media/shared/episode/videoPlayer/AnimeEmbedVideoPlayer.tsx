import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import VideoPlayerError from "./VideoPlayerError";
import { useSearch } from "@tanstack/react-router";

type Props = {
  embedLink: string;
};

export default function AnimeEmbedVideoPlayer({ embedLink }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { animeServer: server } = useSearch({
    from: "/_protected/anime/$animeId/watch/",
  });

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
          src={embedLink}
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
