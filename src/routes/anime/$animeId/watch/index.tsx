import {
  useFetchAnimeInfoAnify,
  useFetchAnimeInfoAnilist,
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
import Episodes from "../-Episodes";

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

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId, true);

  if (
    isEpisodeStreamLinksLoading ||
    isAnimeInfoAnifyLoading ||
    isAnimeInfoAnilistLoading
  ) {
    return (
      <div className="grid text-2xl text-white h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-red-500">
            {isEpisodeStreamLinksLoading &&
            isAnimeInfoAnifyLoading &&
            isAnimeInfoAnilistLoading
              ? "ALL"
              : isEpisodeStreamLinksLoading
                ? "EPISODE"
                : isAnimeInfoAnifyLoading
                  ? "ANIFY"
                  : "ANILIST"}
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

  if (episodeStreamLinks && animeInfoAnify && animeInfoAnilist) {
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="w-full mt-20 aspect-video">
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
        <div className="w-full mt-2">
          <div className="flex flex-col gap-1 px-2">
            <p className="text-xl font-bold">
              {animeInfoAnilist.title.english ?? animeInfoAnify.title.english}
            </p>
            <p className="text-lg font-bold text-gray-400">EPISODE 1</p>
            <p className="text-sm font-medium line-clamp-1">
              The man who will become the king of the pirates
            </p>
          </div>
          <Episodes
            type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
            animeInfoAnilist={animeInfoAnilist}
            animeInfoAnify={animeInfoAnify}
            defaultEpisodeImage={
              animeInfoAnify?.coverImage ?? animeInfoAnilist?.cover
            }
          />
          {/* <div className="mt-12 space-y-4">
            <p className="text-xl font-bold">Episodes</p>
            <div className="w-full overflow-y-auto h-[400px]">
              <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="relative bg-gray-600 rounded-lg aspect-video"
                    >
                      <p className="absolute left-1 bottom-1">
                        Episode {i + 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
