import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { z } from "zod";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { VideoPlayer } from "@/components/core/media/shared/episode/VideoPlayer";
import WatchPageAnimeInfo from "../../../../../components/core/media/anime/WatchPageAnimeInfo";
import {
  useFetchEpisodeStreamLinks,
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
  useChunkAnimeEpisodes,
  useEpisodeInfo
} from "@/services/media/anime/queries/animeQueries";
import EpisodeTitleAndNumber from "@/components/core/media/shared/episode/EpisodeTitleAndNumber";
import { AnimeGenre } from "@/utils/types/media/anime/animeAnilist";
import MediaCard from "@/components/core/media/shared/MediaCard";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import WatchPageAnimeEpisodes from "@/components/core/media/anime/episodesList/WatchPageAnimeEpisodes";

const anilistGenres = Object.values(AnimeGenre).map((genre) =>
  genre.toString()
);

const episodePageSearchParams = z.object({
  id: z.coerce.string()
});

export const Route = createFileRoute("/_protected/anime/$animeId/watch/")({
  component: () => <WatchEpisodePage />,
  validateSearch: (search) => episodePageSearchParams.parse(search)
});

function WatchEpisodePage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { animeId } = Route.useParams();
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight
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
    error: episodeStreamLinksError
  } = useFetchEpisodeStreamLinks(id);

  const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError
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
          <div ref={videoAndEpisodeInfoContainerRef} className="w-full h-fit">
            <VideoPlayer
              poster={
                episodeInfo.image ||
                animeInfoAnilist.cover ||
                animeInfoAnify.bannerImage
              }
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
            <EpisodeTitleAndNumber
              episodeNumber={`Episode ${episodeInfo.number}`}
              episodeTitle={episodeInfo.title}
            />
          </div>
          <WatchPageAnimeEpisodes
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            episodeImageFallback={
              animeInfoAnilist?.cover ||
              animeInfoAnify?.coverImage ||
              animeInfoAnilist?.image ||
              animeInfoAnify?.bannerImage
            }
            episodesQuery={episodesQuery}
            replace
            type={animeInfoAnilist?.type || animeInfoAnify?.format}
            currentlyWatchingEpisodeNumber={episodeInfo.number}
          />
        </section>
        <WatchPageAnimeInfo
          title={
            animeInfoAnilist?.title.english ||
            animeInfoAnilist?.title.romaji ||
            animeInfoAnify?.title.english ||
            animeInfoAnify?.title.romaji
          }
          cover={animeInfoAnify?.bannerImage || animeInfoAnilist?.cover}
          image={animeInfoAnilist?.image || animeInfoAnify?.coverImage}
          description={
            animeInfoAnilist?.description || animeInfoAnify?.description
          }
          genres={
            animeInfoAnilist?.genres || animeInfoAnify?.genres
              ? animeInfoAnify?.genres.filter((genre) =>
                  anilistGenres.includes(genre)
                )
              : undefined
          }
          status={animeInfoAnilist?.status || animeInfoAnify?.status}
          totalEpisodes={
            animeInfoAnilist?.totalEpisodes || animeInfoAnify?.totalEpisodes
          }
          type={animeInfoAnilist?.type || animeInfoAnify?.format}
          year={animeInfoAnilist?.releaseDate || animeInfoAnify?.year}
          rating={
            animeInfoAnilist?.rating * 0.1 ||
            animeInfoAnify?.rating?.anilist ||
            null
          }
        />
        {animeInfoAnilist?.recommendations && (
          <CategoryCarousel
            carouselItems={animeInfoAnilist.recommendations}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation, i) => {
              return (
                <CategoryCarouselItem key={recommendation.id || i}>
                  <MediaCard
                    image={recommendation.image || recommendation.cover}
                    linkProps={{
                      to: "/anime/$animeId",
                      params: { animeId: `${recommendation.id}` }
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
