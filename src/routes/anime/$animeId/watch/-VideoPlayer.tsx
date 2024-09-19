import { forwardRef, HTMLAttributes } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { cn } from "@/lib/utils";

type VideoPlayerProps = HTMLAttributes<HTMLDivElement> & {
  streamLink: string | undefined;
  className?: string;
  volume?: number;
  title?: string;
};

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-dvw ml-[calc(-50vw+50%)] lg:w-full lg:ml-auto aspect-video rounded-none",
          props.className
        )}
      >
        {props.streamLink ? (
          <MediaPlayer
            playsInline
            className="rounded-none size-full"
            title={props.title}
            src={props.streamLink}
            streamType="on-demand"
            volume={props.volume || 0.08}
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        ) : (
          <div className="grid text-lg font-medium size-full place-items-center">
            Error: Source Not Found
          </div>
        )}
      </div>
    );
  }
);
