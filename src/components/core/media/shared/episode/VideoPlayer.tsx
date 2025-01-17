import { forwardRef, HTMLAttributes } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout
} from "@vidstack/react/player/layouts/default";
import { cn } from "@/lib/utils";

type VideoPlayerProps = HTMLAttributes<HTMLDivElement> & {
  streamLink: string | undefined;
  headers?: string;
  className?: string;
  volume?: number;
  title?: string;
};

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ headers = "{}", streamLink, className, title, ...props }, ref) => {
    return (
      <div
        ref={ref}
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
            src={`${import.meta.env.VITE_ANIME_PROXY_URL}/proxy?url=${btoa(streamLink)}&headers=${btoa(headers)}`}
            volume={0.08}
          >
            <MediaProvider>
              <Poster className="vds-poster" />
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
);
