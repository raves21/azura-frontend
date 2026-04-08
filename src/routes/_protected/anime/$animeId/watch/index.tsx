import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { z } from "zod";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import WatchPageAnimeInfo from "@/components/core/media/anime/infoSection/WatchPageAnimeInfo";
import {
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
} from "@/utils/types/media/shared";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import {
  buildAnimeEmbedLink,
  getAnimeRatingInfoPage,
  getDefaultAnimeServer,
} from "@/utils/functions/media/sharedFunctions";
import AnimeEmbedVideoPlayer from "@/components/core/media/shared/episode/videoPlayer/AnimeEmbedVideoPlayer";

const episodePageSearchSchema = z.object({
  id: z.string(),
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
        id: "",
        epNum: 1,
        animeServer: AnimeServerName.serverAshen,
        success: false,
      };
    }
  },
});

function WatchEpisodePage() {
  const navigate = useNavigate();
  const { id, success, epNum, animeServer: server } = Route.useSearch();
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

  // const { data: aniwatchStreamLink, isLoading: isAniwatchStreamLinkLoading } =
  //   useAnimeEpisodeStreamLinkAniwatch(id);

  const { data: zencloudStream, isLoading: isZencloudStreamLoading } =
    useEmbedStreamZencloud({ animeId: animeId, episodeNum: epNum });

  const episodesQuery = useAnimeEpisodes(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useAnimeInfo({ animeId });

  const { data: chunkedEpisodes } = useChunkAnimeEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(id, chunkedEpisodes);

  //sets the videoAndEpisodeInfoContainerHeight everytime window width changes
  useEffect(() => {
    if (videoAndEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndEpisodeInfoContainerRef.current.getBoundingClientRect().height,
      );
    }
  }, [episodeInfo, windowWidth, zencloudStream, server]);

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
    const {
      animeInfoAnilist,
      // animeInfoAniwatch
    } = animeInfo;

    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            {server === AnimeServerName.serverAshen &&
              (zencloudStream && zencloudStream.player_url ? (
                <AnimeEmbedVideoPlayer embedLink={zencloudStream.player_url} />
              ) : isZencloudStreamLoading ? (
                <VideoPlayerSkeleton />
              ) : (
                <VideoPlayerError serverName={server} />
              ))}

            {server === AnimeServerName.serverBlight && (
              <AnimeEmbedVideoPlayer
                embedLink={buildAnimeEmbedLink(id, epNum, server)}
              />
            )}

            {server === AnimeServerName.serverCrowe && (
              <AnimeEmbedVideoPlayer
                embedLink={buildAnimeEmbedLink(
                  animeId,
                  epNum,
                  server,
                  animeInfoAnilist.type === "MOVIE",
                )}
              />
            )}

            <EpisodeTitleAndNumber
              episodeNumber={`Episode ${episodeInfo.number}`}
              episodeTitle={episodeInfo.title}
            />
          </div>
          <WatchPageAnimeEpisodes
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            episodeImageFallback={
              animeInfoAnilist?.cover || animeInfoAnilist?.image
            }
            episodesQuery={episodesQuery}
            replace
            type={animeInfoAnilist?.type}
            currentlyWatchingEpisodeNumber={episodeInfo.number}
          />
        </section>
        <WatchPageAnimeInfo
          title={
            animeInfoAnilist.title.english ||
            animeInfoAnilist.title.romaji ||
            animeInfoAnilist.title.native
          }
          cover={animeInfoAnilist?.cover || animeInfoAnilist?.image}
          image={animeInfoAnilist?.image}
          description={animeInfoAnilist?.description}
          genres={animeInfoAnilist?.genres}
          status={animeInfoAnilist?.status}
          totalEpisodes={animeInfoAnilist?.totalEpisodes}
          type={animeInfoAnilist?.type}
          year={animeInfoAnilist?.releaseDate}
          rating={getAnimeRatingInfoPage(undefined, animeInfoAnilist?.rating)}
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
