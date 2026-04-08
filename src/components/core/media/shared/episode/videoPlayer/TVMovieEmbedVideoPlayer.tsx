import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import { cn } from "@/lib/utils";
import { TVMovieServerName } from "@/utils/types/media/shared";
import { useState } from "react";
import VideoPlayerError from "./VideoPlayerError";

type Props = {
  embedLink: string | null;
  server: TVMovieServerName;
};

export default function TVMovieEmbedVideoPlayer({ embedLink, server }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isLoading && <VideoPlayerSkeleton />}
      {(isError || !embedLink) && <VideoPlayerError serverName={server} />}
      {embedLink && (
        <div
          className={cn(
            "w-dvw ml-[calc(-50vw+50%)] relative lg:w-full lg:ml-auto aspect-video rounded-none",
            isLoading || isError ? "hidden" : "",
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
      )}
    </>
  );
}
