import { createFileRoute, redirect } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { z } from "zod";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import VideoPlayer from "@/components/core/media/shared/episode/VideoPlayer";
import WatchPageAnimeInfo from "@/components/core/media/anime/infoSection/WatchPageAnimeInfo";
import {
  useFetchEpisodeStreamLinks,
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
  useChunkAnimeEpisodes,
  useEpisodeInfo,
} from "@/services/media/anime/queries/animeQueries";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
// import { AnimeGenre } from "@/utils/types/media/anime/animeAnilist";
import MediaCard from "@/components/core/media/shared/MediaCard";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import WatchPageAnimeEpisodes from "@/components/core/media/anime/episodesList/WatchPageAnimeEpisodes";
import VideoPlayerSkeleton from "@/components/core/loadingSkeletons/media/episode/VideoPlayerSkeleton";
import EpisodeTitleAndNumberSkeleton from "@/components/core/loadingSkeletons/media/episode/EpisodeTitleAndNumberSkeleton";
import AllEpisodesLoading from "@/components/core/loadingSkeletons/media/episode/AllEpisodesLoading";
import WatchInfoPageSkeleton from "@/components/core/loadingSkeletons/media/info/WatchPageInfoSkeleton";
import VideoPlayerError from "@/components/core/media/shared/episode/VideoPlayerError";

// const anilistGenres = Object.values(AnimeGenre).map((genre) =>
//   genre.toString()
// );

const episodePageSearchSchema = z.object({
  id: z.string(),
});

type EpisodePageSearchSchema = z.infer<typeof episodePageSearchSchema>;

export const Route = createFileRoute("/_protected/anime/$animeId/watch/")({
  component: () => <WatchEpisodePage />,
  validateSearch: (search): EpisodePageSearchSchema => {
    const validated = episodePageSearchSchema.safeParse(search);
    if (validated.success) {
      return validated.data;
    } else {
      redirect({ to: "/anime" });
      return { id: "" };
    }
  },
});

function WatchEpisodePage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { animeId } = Route.useParams();
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight,
  ] = useState(0);

  const windowWidth = useWindowWidth();

  //navigates back to info page if id (episode id) search param is not given
  useEffect(() => {
    if (!id) {
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

  const { data: chunkedEpisodes } = useChunkAnimeEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(id, chunkedEpisodes);

  //sets the videoAndEpisodeInfoContainerHeight everytime window width changes
  useEffect(() => {
    if (videoAndEpisodeInfoContainerRef.current) {
      setVideoAndEpisodeInfoContainerHeight(
        videoAndEpisodeInfoContainerRef.current.getBoundingClientRect().height
      );
    }
  }, [episodeStreamLinks, episodeInfo, windowWidth]);

  if (
    isEpisodeStreamLinksLoading &&
    (isAnimeInfoLoading || episodesQuery.isLoading)
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

  if (episodeStreamLinksError || episodesQuery.error || animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfo && episodesQuery.data && episodeInfo) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row">
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            {episodeStreamLinks ? (
              <VideoPlayer
                mediaType="ANIME"
                poster={episodeInfo.image || animeInfo.cover}
                streamLink={
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "backup"
                  )?.url ??
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "default"
                  )?.url
                }
                title={episodeInfo.title}
              />
            ) : isEpisodeStreamLinksLoading ? (
              <VideoPlayerSkeleton />
            ) : (
              <VideoPlayerError />
            )}
            <EpisodeTitleAndNumber
              episodeNumber={`Episode ${episodeInfo.number}`}
              episodeTitle={episodeInfo.title}
            />
          </div>
          <WatchPageAnimeEpisodes
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            episodeImageFallback={animeInfo.cover || animeInfo.image}
            episodesQuery={episodesQuery}
            replace
            type={animeInfo.type}
            currentlyWatchingEpisodeNumber={episodeInfo.number}
          />
        </section>
        <WatchPageAnimeInfo
          title={animeInfo.title.english || animeInfo.title.romaji}
          cover={animeInfo.cover}
          image={animeInfo.image}
          description={animeInfo.description}
          genres={animeInfo.genres}
          status={animeInfo.status}
          totalEpisodes={animeInfo.totalEpisodes}
          type={animeInfo.type}
          year={animeInfo.releaseDate}
          rating={parseInt((animeInfo.rating * 0.1).toFixed(1))}
        />
        {animeInfo.recommendations && (
          <CategoryCarousel
            carouselItems={animeInfo.recommendations}
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
