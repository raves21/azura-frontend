import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { z } from "zod";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import VideoPlayer from "@/components/core/media/shared/episode/videoPlayer/VideoPlayer";
import WatchPageAnimeInfo from "@/components/core/media/anime/infoSection/WatchPageAnimeInfo";
import {
  useAnimeEpisodeStreamLinkAniwatch,
  useAnimeEpisodes,
  useAnimeInfo,
  useChunkAnimeEpisodes,
  useEmbedStreamZencloud,
  useEpisodeInfo,
} from "@/services/media/anime/queries";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import MediaCard from "@/components/core/media/shared/MediaCard";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import WatchPageAnimeEpisodes from "@/components/core/media/anime/episodesList/WatchPageAnimeEpisodes";
import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import EpisodeTitleAndNumberSkeleton from "@/components/core/loadingSkeletons/media/episode/EpisodeTitleAndNumberSkeleton";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import WatchInfoPageSkeleton from "@/components/core/loadingSkeletons/media/info/WatchPageInfoSkeleton";
import VideoPlayerError from "@/components/core/media/shared/episode/videoPlayer/VideoPlayerError";
import {
  AnimeServerName,
  SearchSchemaValidationStatus,
  Subtitle,
} from "@/utils/types/media/shared";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { Kind } from "@/utils/types/media/anime/animeAnilist";
import {
  getAnimeRatingInfoPage,
  getDefaultAnimeServer,
} from "@/utils/functions/media/sharedFunctions";
import AnimeEmbedVideoPlayer from "@/components/core/media/shared/episode/videoPlayer/AnimeEmbedVideoPlayer";

const episodePageSearchSchema = z.object({
  id: z.string(),
  title: z.string(),
  lang: z.enum(["eng", "jap"]),
  epNum: z.coerce.number(),
  animeServer: z.nativeEnum(AnimeServerName).catch(getDefaultAnimeServer()),
});

type EpisodePageSearchSchema = z.infer<typeof episodePageSearchSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/anime/$animeId/watch/")({
  component: () => <WatchEpisodePage />,
  validateSearch: (search): EpisodePageSearchSchema => {
    const validated = episodePageSearchSchema.safeParse(search);
    if (validated.success) {
      return {
        ...validated.data,
        success: true,
      };
    } else {
      return {
        title: "",
        lang: "eng",
        id: "",
        epNum: 1,
        animeServer: AnimeServerName.server1,
        success: false,
      };
    }
  },
});

function WatchEpisodePage() {
  const navigate = useNavigate();
  const {
    id,
    lang,
    title,
    success,
    epNum,
    animeServer: server,
  } = Route.useSearch();
  const { animeId } = Route.useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationFail: () => navigate({ to: "/anime" }),
  });

  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight,
  ] = useState(0);

  const windowWidth = useWindowWidth();

  const { data: aniwatchStreamLink, isLoading: isAniwatchStreamLinkLoading } =
    useAnimeEpisodeStreamLinkAniwatch(id);

  const { data: zencloudStream, isLoading: isZencloudStreamLoading } =
    useEmbedStreamZencloud({ animeId: animeId, episodeNum: epNum });

  const episodesQuery = useAnimeEpisodes({
    animeId,
    title,
    titleLang: lang,
  });

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useAnimeInfo({ animeId, title, titleLang: lang });

  const { data: chunkedEpisodes } = useChunkAnimeEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(id, chunkedEpisodes);

  //sets the videoAndEpisodeInfoContainerHeight everytime window width changes
  useEffect(() => {
    if (videoAndEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndEpisodeInfoContainerRef.current.getBoundingClientRect().height
      );
    }
  }, [aniwatchStreamLink, episodeInfo, windowWidth, zencloudStream, server]);

  if (isAnimeInfoLoading || episodesQuery.isLoading) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            <VideoPlayerSkeleton />
            <EpisodeTitleAndNumberSkeleton />
          </div>
          <AllEpisodesLoading variant="watchPage" />
        </section>
        <WatchInfoPageSkeleton />
      </main>
    );
  }

  if (episodesQuery.error || animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfo && episodesQuery.data && episodeInfo) {
    const { animeInfoAnilist, animeInfoAniwatch } = animeInfo;

    let subtitleTracks: Subtitle[] | undefined = undefined;
    if (server === AnimeServerName.server1 && aniwatchStreamLink) {
      subtitleTracks = aniwatchStreamLink.tracks
        .filter((track) => track.kind === Kind.Captions)
        .map((caption) => ({
          lang: caption.label!,
          url: caption.file,
        }));
    }

    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            {server === AnimeServerName.server1 &&
              (aniwatchStreamLink && aniwatchStreamLink.sources.length !== 0 ? (
                <VideoPlayer
                  mediaType="ANIME"
                  poster={
                    episodeInfo.image ||
                    animeInfoAnilist?.cover ||
                    animeInfoAniwatch?.info.poster
                  }
                  subtitleTracks={subtitleTracks}
                  streamLink={aniwatchStreamLink.sources[0].url}
                  headers={aniwatchStreamLink.headers}
                  title={episodeInfo.title}
                />
              ) : isAniwatchStreamLinkLoading ? (
                <VideoPlayerSkeleton />
              ) : (
                <VideoPlayerError serverName={server} />
              ))}

            {server === AnimeServerName.server2 &&
              (zencloudStream && zencloudStream.player_url ? (
                <AnimeEmbedVideoPlayer embedLink={zencloudStream.player_url} />
              ) : isZencloudStreamLoading ? (
                <VideoPlayerSkeleton />
              ) : (
                <VideoPlayerError serverName={server} />
              ))}

            <EpisodeTitleAndNumber
              episodeNumber={`Episode ${episodeInfo.number}`}
              episodeTitle={episodeInfo.title}
            />
          </div>
          <WatchPageAnimeEpisodes
            title={title}
            titleLang={lang}
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            episodeImageFallback={
              animeInfoAnilist?.cover ||
              animeInfoAnilist?.image ||
              animeInfoAniwatch?.info.poster
            }
            episodesQuery={episodesQuery}
            replace
            type={animeInfoAnilist?.type || animeInfoAniwatch?.info.stats.type}
            currentlyWatchingEpisodeNumber={episodeInfo.number}
          />
        </section>
        <WatchPageAnimeInfo
          title={title}
          cover={
            animeInfoAnilist?.cover ||
            animeInfoAnilist?.image ||
            animeInfoAniwatch?.info.poster
          }
          titleLang={lang}
          image={animeInfoAnilist?.image || animeInfoAniwatch?.info.poster}
          description={
            animeInfoAnilist?.description || animeInfoAniwatch?.info.description
          }
          genres={animeInfoAnilist?.genres}
          status={animeInfoAnilist?.status}
          totalEpisodes={animeInfoAnilist?.totalEpisodes}
          type={animeInfoAnilist?.type || animeInfoAniwatch?.info.stats.type}
          year={animeInfoAnilist?.releaseDate}
          rating={getAnimeRatingInfoPage(
            animeInfoAniwatch?.moreInfo.malscore
              ? parseFloat(animeInfoAniwatch?.moreInfo.malscore)
              : undefined,
            animeInfoAnilist?.rating
          )}
        />
        {animeInfoAnilist?.recommendations && (
          <CategoryCarousel
            carouselItems={animeInfoAnilist?.recommendations}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation, i) => {
              return (
                <CategoryCarouselItem key={recommendation.id || i}>
                  <MediaCard
                    image={recommendation.image || recommendation.cover}
                    linkProps={{
                      to: "/anime/$animeId",
                      params: { animeId: `${recommendation.id}` },
                      search: {
                        title:
                          recommendation.title.english ||
                          recommendation.title.romaji,
                        lang: recommendation.title.english ? "eng" : "jap",
                      },
                    }}
                    subLabels={[recommendation.type, recommendation.status]}
                    title={
                      recommendation.title.english ||
                      recommendation.title.romaji ||
                      recommendation.title.userPreferred
                    }
                  />
                </CategoryCarouselItem>
              );
            }}
          />
        )}
      </main>
    );
  }
}
