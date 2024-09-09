import {
  useChunkEpisodes,
  useFetchAnimeInfoAnify,
  useFetchAnimeInfoAnilist,
} from "@/api/animes";
import { createFileRoute } from "@tanstack/react-router";
import AnimeHeroComponent from "../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { useEffect } from "react";
import AnimeCategoryCarousel from "../-AnimeCategoryCarousel";
import { Format, Status } from "@/utils/types/animeAnilist";
export const Route = createFileRoute("/anime/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();

  const {
    data: animeInfoAnify,
    isLoading: isAnimeInfoAnifyLoading,
    error: animeInfoAnifyError,
  } = useFetchAnimeInfoAnify(animeId);
  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId);

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(animeInfoAnilist, animeInfoAnify);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (
    isAnimeInfoAnifyLoading ||
    isAnimeInfoAnilistLoading ||
    isChunkEpisodesLoading
  ) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-green-500">ANIME INFO</span>
        </p>
      </div>
    );
  }

  if (animeInfoAnifyError && animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfoAnify || animeInfoAnilist) {
    return (
      <main className="w-full pb-32">
        <AnimeHeroComponent
          animeId={animeId}
          title={
            animeInfoAnify?.title.english ??
            animeInfoAnify?.title.romaji ??
            animeInfoAnilist?.title.english ??
            animeInfoAnilist?.title.romaji
          }
          cover={animeInfoAnify?.bannerImage ?? animeInfoAnilist?.cover}
          image={animeInfoAnilist?.image ?? animeInfoAnify?.coverImage}
          id={animeInfoAnilist?.id ?? animeInfoAnify?.id}
          description={
            animeInfoAnilist?.description ?? animeInfoAnify?.description
          }
          genres={animeInfoAnilist?.genres}
          status={
            animeInfoAnilist?.status ?? (animeInfoAnify?.status as Status)
          }
          totalEpisodes={
            animeInfoAnify?.totalEpisodes ?? animeInfoAnilist?.totalEpisodes
          }
          type={animeInfoAnilist?.type ?? (animeInfoAnify?.format as Format)}
          year={animeInfoAnilist?.releaseDate ?? animeInfoAnify?.year}
          rating={
            animeInfoAnify?.rating.anilist ??
            animeInfoAnilist?.rating! * 0.1 ??
            null
          }
        />
        <Episodes
          isInfoPage
          animeId={animeInfoAnify?.id ?? animeInfoAnilist?.id}
          chunkedEpisodes={chunkedEpisodes}
          replace={false}
          type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
          defaultEpisodeImage={
            animeInfoAnify?.coverImage ?? animeInfoAnilist?.cover
          }
        />
        {animeInfoAnilist?.recommendations &&
          animeInfoAnilist?.recommendations.length !== 0 && (
            <AnimeCategoryCarousel
              isInfoPage
              isHomePage={false}
              recommendations={animeInfoAnilist?.recommendations}
              categoryName="Recommendations"
            />
          )}
      </main>
    );
  }
}
