import {
  useFetchAnimeInfoAnify,
  useFetchEpisodeStreamLinks,
} from "@/api/animes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaProvider,
  MediaPlayerInstance,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

type EpisodePageSearchParams = {
  id: string;
};

export const Route = createFileRoute("/anime/$animeId/watch/")({
  component: () => <EpisodePage />,
  validateSearch: (
    search: Record<string, unknown>
  ): EpisodePageSearchParams => {
    return {
      id: search.id as string,
    };
  },
});

function EpisodePage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { animeId } = Route.useParams();
  const mediaPlayerRef = useRef<MediaPlayerInstance | null>(null);
  useEffect(() => {
    if (!id || id === "") {
      navigate({ to: "/anime/$animeId", params: { animeId: animeId } });
    }
  }, []);

  const {
    data: episodeStreamLinks,
    isLoading: isEpisodeStreamLinksLoading,
    error: episodeStreamLinksError,
  } = useFetchEpisodeStreamLinks(id);

  const {
    data: animeInfoAnify,
    isLoading: isAnimeInfoAnifyLoading,
    error: animeInfoAnifyError,
  } = useFetchAnimeInfoAnify(animeId);

  if (isEpisodeStreamLinksLoading || isAnimeInfoAnifyLoading) {
    return (
      <div className="grid text-2xl text-white h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-red-500">
            {isEpisodeStreamLinksLoading && isAnimeInfoAnifyLoading
              ? "BOTH"
              : isEpisodeStreamLinksLoading
                ? "EPISODE"
                : "ANIFY"}
          </span>
        </p>
      </div>
    );
  }
  if (episodeStreamLinksError || animeInfoAnifyError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (episodeStreamLinks && animeInfoAnify) {
    return (
      <div className="grid w-full min-h-screen gap-2 text-white place-items-center">
        <div className="aspect-video h-[500px] mt-20">
          <MediaPlayer
            ref={mediaPlayerRef}
            playsInline
            className="size-full"
            // title="Sprite Fight"
            src={
              episodeStreamLinks.sources.find(
                (source) => source.quality === "default"
              )?.url ??
              episodeStreamLinks.sources.find(
                (source) => source.quality === "backup"
              )?.url
            }
            streamType="on-demand"
            volume={0.08}
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      </div>
    );
  }
}
