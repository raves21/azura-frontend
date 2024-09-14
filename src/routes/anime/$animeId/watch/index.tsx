import {
  useChunkEpisodes,
  useEpisodeInfo,
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
  useFetchEpisodeStreamLinks,
} from "@/api/animes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
import { z } from "zod";
import { useGetWindowWidth } from "@/utils/hooks/useGetWindowWidth";

const episodePageSearchParams = z.object({
  id: z.coerce.string(),
});

export const Route = createFileRoute("/anime/$animeId/watch/")({
  component: () => <WatchEpisodePage />,
  validateSearch: (search) => episodePageSearchParams.parse(search),
});

function WatchEpisodePage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { animeId } = Route.useParams();
  const mediaPlayerRef = useRef<MediaPlayerInstance | null>(null);
  const videoAndeEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight,
  ] = useState(0);

  const windowWidth = useGetWindowWidth();

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

  useEffect(() => {
    if (videoAndeEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndeEpisodeInfoContainerRef.current.getBoundingClientRect().height
      );
    }
  }, [episodeStreamLinks, episodeInfo, windowWidth]);

  if (
    isEpisodeStreamLinksLoading ||
    isAnimeInfoLoading ||
    episodesQuery.isLoading
  ) {
    return (
      <div className="grid text-2xl text-white h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-red-500">EPISODE</span>
        </p>
      </div>
    );
  }
  if (episodeStreamLinksError || episodesQuery.error || animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (episodeStreamLinks && animeInfo && episodesQuery.data && episodeInfo) {
    const { animeInfoAnilist, animeInfoAnify } = animeInfo;
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndeEpisodeInfoContainerRef} className="w-full h-fit">
            <div className="w-dvw ml-[calc(-50vw+50%)] lg:w-full lg:ml-auto aspect-video rounded-none">
              <MediaPlayer
                ref={mediaPlayerRef}
                playsInline
                className="rounded-none size-full"
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
            <div className="flex flex-col w-full gap-1 mt-2 lg:px-0">
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
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
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
