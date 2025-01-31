import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import VideoPlayer from "@/components/core/media/shared/episode/VideoPlayer";
import MediaCard from "@/components/core/media/shared/MediaCard";
import WatchPageTVEpisodes from "@/components/core/media/tv/episodeList/WatchPageTVEpisodes";
import {
  getTMDBImageURL,
  getTMDBReleaseYear,
  useMediaScraper
} from "@/services/media/sharedFunctions";
import {
  useTVInfo,
  useTVRecommendations,
  useTVSeasonEpisodes
} from "@/services/media/tv/tvQueries";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import WatchPageTVInfo from "@/components/core/media/tv/infoSection/WatchPageTVInfo";
import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import EpisodeTitleAndNumberSkeleton from "@/components/core/loadingSkeletons/media/episode/EpisodeTitleAndNumberSkeleton";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import WatchInfoPageSkeleton from "@/components/core/loadingSkeletons/media/info/WatchPageInfoSkeleton";
import VideoPlayerError from "@/components/core/media/shared/episode/VideoPlayerError";

const watchTVEpisodePageSchema = z.object({
  tvEp: z.number(),
  tvSeason: z.number()
});

type WatchTVEpisodePageSchema = z.infer<typeof watchTVEpisodePageSchema>;

export const Route = createFileRoute("/_protected/tv/$tvId/watch/")({
  component: () => <WatchTVEpisodePage />,
  validateSearch: (search): WatchTVEpisodePageSchema => {
    const v = watchTVEpisodePageSchema.safeParse(search);
    if (v.success) {
      return v.data;
    } else {
      //if search params validation fails, provide defaults (season 1, episode 1).
      return { tvEp: 1, tvSeason: 1 };
    }
  }
});

function WatchTVEpisodePage() {
  const { tvEp, tvSeason } = Route.useSearch();
  const { tvId } = Route.useParams();
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight
  ] = useState(0);
  const [hasMainSeasons, setHasMainSeasons] = useState(false);
  const [totalSeasons, setTotalSeasons] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  const {
    data: tvInfo,
    isLoading: isTVInfoLoading,
    error: tvInfoError
  } = useTVInfo(tvId);

  useEffect(() => {
    if (tvInfo) {
      //only include main seasons, dont include special seasons (season 0)
      const mainTVSeasons = tvInfo.seasons.filter(
        (season) => season.season_number > 0
      );
      if (mainTVSeasons.length !== 0) {
        setTotalSeasons(mainTVSeasons.length);
        setHasMainSeasons(true);
      }
    }
  }, [tvInfo]);

  const tvSeasonEpisodesQuery = useTVSeasonEpisodes({
    tvId,
    seasonNum: tvSeason,
    enabled: !!tvInfo && hasMainSeasons
  });

  const {
    data: tvSeasonEpisodes,
    isLoading: isTVSeasonEpisodesLoading,
    error: tvSeasonEpisodesError
  } = tvSeasonEpisodesQuery;

  const {
    data: tvRecommendations,
    isLoading: isTVRecommendationsLoading,
    error: tvRecommendationsError
  } = useTVRecommendations(tvId);

  const mediaScraperQuery = useMediaScraper({
    type: "TV",
    enabled: !!tvInfo && hasMainSeasons,
    mediaId: tvId,
    epNum: tvEp,
    seasonNum: tvSeason
  });

  const {
    data: mediaScraperData,
    isLoading: isMediaScraperLoading,
    error: mediaScraperError
  } = mediaScraperQuery;

  //sets the videoAndEpisodeInfoContainerHeight everytime window width changes
  useEffect(() => {
    if (videoAndEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndEpisodeInfoContainerRef.current.getBoundingClientRect().height
      );
    }
  }, [mediaScraperData, tvInfo, windowWidth]);

  if (
    isMediaScraperLoading &&
    (isTVInfoLoading || isTVRecommendationsLoading || isTVSeasonEpisodesLoading)
  ) {
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

  if (
    mediaScraperError &&
    (tvInfoError ||
      !hasMainSeasons ||
      tvSeasonEpisodesError ||
      tvRecommendationsError ||
      !totalSeasons)
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (tvInfo && tvRecommendations && tvSeasonEpisodes && totalSeasons) {
    const currentEpisode = tvSeasonEpisodes[tvEp - 1];
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            {mediaScraperData ? (
              <VideoPlayer
                poster={getTMDBImageURL(currentEpisode.still_path)}
                streamLink={
                  mediaScraperData.url ? mediaScraperData.url[0].link : null
                }
                subtitleTracks={mediaScraperData.tracks}
                headers={mediaScraperData.headers}
                title={currentEpisode?.name || undefined}
              />
            ) : isMediaScraperLoading ? (
              <VideoPlayerSkeleton />
            ) : (
              <VideoPlayerError />
            )}
            <EpisodeTitleAndNumber
              episodeNumber={`Episode ${tvEp}`}
              episodeTitle={currentEpisode?.name || undefined}
            />
          </div>
          <WatchPageTVEpisodes
            coverImage={getTMDBImageURL(tvInfo.backdrop_path)}
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            totalSeasons={totalSeasons}
            episodes={tvSeasonEpisodes}
          />
        </section>
        <WatchPageTVInfo
          title={tvInfo.name}
          cover={getTMDBImageURL(tvInfo.backdrop_path)}
          image={getTMDBImageURL(tvInfo.poster_path)}
          description={tvInfo.overview}
          genres={tvInfo.genres}
          status={tvInfo.status}
          runTime={tvInfo.last_episode_to_air?.runtime || null}
          year={getTMDBReleaseYear(tvInfo.first_air_date)}
          voteAverage={tvInfo.vote_average}
        />
        {tvRecommendations.results.length !== 0 && (
          <CategoryCarousel
            carouselItems={tvRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation, i) => {
              return (
                <CategoryCarouselItem key={recommendation.id || i}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{
                      to: "/tv/$tvId",
                      params: { tvId: recommendation.id.toString() }
                    }}
                    subLabels={[
                      getTMDBReleaseYear(recommendation.first_air_date)
                    ]}
                    title={recommendation.name}
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
