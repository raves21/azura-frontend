import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { cn } from "@/lib/utils";
import { Subtitle } from "@/utils/types/media/shared";
import { getRandomAniwatchProxyURL } from "@/services/media/anime/functions/animeFunctions";

type VideoPlayerProps = {
  streamLink: string | undefined | null;
  poster: string | undefined;
  headers?: Record<string, string>;
  className?: string;
  volume?: number;
  title?: string;
  mediaType: "ANIME" | "TV" | "MOVIE";
  subtitleTracks?: Subtitle[];
};

export default function VideoPlayer({
  headers,
  streamLink,
  className,
  poster,
  title,
  subtitleTracks,
  mediaType,
  ...props
}: VideoPlayerProps) {
  if (streamLink) {
    let streamLinkFinal: string;
    if (mediaType === "ANIME") {
      streamLinkFinal = `${getRandomAniwatchProxyURL()}?url=${streamLink}`;
    } else {
      streamLinkFinal = `${import.meta.env.VITE_TMDB_PROXY_URL}/m3u8-proxy.m3u8?url=${encodeURIComponent(streamLink)}`;
    }

    return (
      <div
        {...props}
        className={cn(
          "w-dvw ml-[calc(-50vw+50%)] lg:w-full lg:ml-auto aspect-video rounded-none",
          className
        )}
      >
        <MediaPlayer
          crossOrigin
          playsInline={false}
          className="rounded-none size-full"
          title={title}
          src={streamLinkFinal}
          volume={0.5}
          poster={poster}
        >
          <MediaProvider>
            <Poster className="vds-poster" />
            {subtitleTracks?.map((sub) => (
              <Track
                default={sub.lang.toLowerCase().startsWith("english")}
                id={sub.url}
                kind="subtitles"
                src={sub.url}
                label={sub.lang}
                key={sub.url}
              />
            ))}
          </MediaProvider>
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cn(
        "w-dvw ml-[calc(-50vw+50%)] relative lg:w-full lg:ml-auto aspect-video rounded-none",
        className
      )}
    >
      <img
        src="/static-screen.gif"
        className="font-medium rounded-lg size-full object-cover z-10"
      />
      <div className="absolute inset-0 bg-black/60 z-20" />
      <p className="text-base mobile-m:text-lg sm:text-2xl md:text-3xl xl:text-4xl font-semibold absolute -translate-x-1/2 z-30 -translate-y-1/2 left-1/2 top-1/2">
        Sorry this media is not available right now
      </p>
    </div>
  );
}
