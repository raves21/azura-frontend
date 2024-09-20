import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Episodes from "../-Episodes";
import AnimeCategoryCarousel from "../../-AnimeCategoryCarousel";
import { z } from "zod";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { VideoPlayer } from "./-VideoPlayer";
import EpisodeAnimeInfo from "./-EpisodeAnimeInfo";
import {
  useFetchEpisodeStreamLinks,
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
  useChunkEpisodes,
  useEpisodeInfo,
} from "@/api/animes";
import EpisodeTitleAndNumber from "./-EpisodeTitleAndNumber";
import { Genre } from "@/utils/types/animeAnilist";

const anilistGenres = Object.values(Genre).map((genre) => genre.toString());

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
  const videoAndEpisodeInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const [
    videoAndeEpisodeInfoContainerHeight,
    setVideoAndEpisodeInfoContainerHeight,
  ] = useState(0);

  const windowWidth = useWindowWidth();

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

  const { data: chunkedEpisodes } = useChunkEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(id, chunkedEpisodes);

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
              episodeNumber={
                episodeInfo ? `Episode ${episodeInfo.number}` : "Loading..."
              }
              episodeTitle={episodeInfo.title}
            />
          </div>
          <Episodes
            episodeListMaxHeight={videoAndeEpisodeInfoContainerHeight}
            episodeImageFallback={
              animeInfoAnilist?.cover ||
              animeInfoAnify?.coverImage ||
              animeInfoAnilist?.image ||
              animeInfoAnify?.bannerImage
            }
            episodesQuery={episodesQuery}
            isInfoPage={false}
            animeId={animeId}
            replace
            type={animeInfoAnilist?.type || animeInfoAnify?.format}
            currentlyWatchingEpisodeNumber={episodeInfo.number}
          />
        </section>
        <EpisodeAnimeInfo
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
            animeInfoAnify?.rating.anilist ||
            null
          }
        />
        {animeInfoAnilist?.recommendations && (
          <AnimeCategoryCarousel
            isHomePage={false}
            categoryName="Recommendations"
            recommendations={animeInfoAnilist?.recommendations}
          />
        )}
      </main>
    );
  }
}
