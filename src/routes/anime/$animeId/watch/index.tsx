import {
  useChunkEpisodes,
  useEpisodeInfo,
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
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
import AnimeCategoryCarousel from "../../-AnimeCategoryCarousel";

type EpisodePageSearchParams = {
  id: string;
};

export const Route = createFileRoute("/anime/$animeId/watch/")({
  component: () => <WatchEpisodePage />,
  validateSearch: (
    search: Record<string, unknown>
  ): EpisodePageSearchParams => {
    return {
      id: search.id as string,
    };
  },
});

function WatchEpisodePage() {
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

  const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId);

  const { data: chunkedEpisodes } = useChunkEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(id, chunkedEpisodes);

  if (isEpisodeStreamLinksLoading || isAnimeInfoLoading) {
    return (
      <div className="grid text-2xl text-white h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-red-500">EPISODE</span>
        </p>
      </div>
    );
  }
  if (episodeStreamLinksError && animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (episodeStreamLinks && animeInfo) {
    const { animeInfoAnilist, animeInfoAnify } = animeInfo;
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div className="w-full">
            <div className="w-full aspect-video">
              <MediaPlayer
                ref={mediaPlayerRef}
                playsInline
                className="size-full"
                // title="Sprite Fight"
                src={
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "backup"
                  )?.url ??
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "default"
                  )?.url
                }
                streamType="on-demand"
                volume={0.08}
              >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
            <div className="flex flex-col w-full gap-1 px-2 mt-2 sm:px-3 lg:px-0">
              <p className="text-lg font-bold sm:text-xl line-clamp-1">
                {animeInfoAnilist?.title?.english ??
                  animeInfoAnilist?.title?.romaji ??
                  animeInfoAnify?.title.english ??
                  animeInfoAnify?.title.romaji ??
                  ""}
              </p>
              <p className="text-lg font-semibold text-gray-400 sm:text-xl">
                {episodeInfo ? `Episode ${episodeInfo.number}` : "Loading..."}
              </p>
              {episodeInfo && (
                <p className="font-medium sm:text-lg line-clamp-1">
                  {episodeInfo.title}
                </p>
              )}
            </div>
          </div>
          <Episodes
            episodeImageFallback={
              animeInfoAnilist?.cover ?? animeInfoAnilist?.image
            }
            episodesQuery={episodesQuery}
            isInfoPage={false}
            animeId={animeId}
            replace
            type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
          />
        </section>
        {animeInfoAnilist?.recommendations && (
          <AnimeCategoryCarousel
            isInfoPage={false}
            isHomePage={false}
            categoryName="Recommendations"
            recommendations={animeInfoAnilist?.recommendations}
          />
        )}
      </main>
    );
  }
}
