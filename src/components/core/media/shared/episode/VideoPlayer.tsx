import { HTMLAttributes } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout
} from "@vidstack/react/player/layouts/default";
import { cn } from "@/lib/utils";
import { Subtitle } from "@/utils/types/media/shared";

type VideoPlayerProps = HTMLAttributes<HTMLDivElement> & {
  streamLink: string | undefined | null;
  poster: string | undefined;
  headers?: Record<string, string>;
  className?: string;
  volume?: number;
  title?: string;
  subtitleTracks?: Subtitle[];
};

export default function VideoPlayer({
  headers,
  streamLink,
  className,
  poster,
  title,
  subtitleTracks,
  ...props
}: VideoPlayerProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-dvw ml-[calc(-50vw+50%)] lg:w-full lg:ml-auto aspect-video rounded-none",
        className
      )}
    >
      {streamLink ? (
        <MediaPlayer
          crossOrigin
          playsInline
          className="rounded-none size-full"
          title={title}
          src={`${import.meta.env.VITE_ANIME_PROXY_URL}/proxy?url=${encodeURIComponent(btoa(streamLink))}&headers=${btoa(JSON.stringify(headers))}`}
          volume={0.08}
          poster={poster}
        >
          <MediaProvider>
            <Poster className="vds-poster" />
            {subtitleTracks?.map((sub) => (
              <Track
                default
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
      ) : (
        <div className="grid text-lg font-medium bg-gray-800 rounded-lg size-full place-items-center">
          Error: Source Not Found
        </div>
      )}
    </div>
  );
}
