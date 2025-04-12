import {
  useFetchAnimeEpisodes,
  useFetchAnimeInfo,
} from "@/services/media/anime/queries/animeQueries";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AnimeInfoPageHero from "@/components/core/media/anime/infoSection/AnimeInfoPageHero";
import { useEffect } from "react";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import InfoPageAnimeEpisodes from "@/components/core/media/anime/episodesList/InfoPageAnimeEpisodes";
import InfoPageHeroSkeleton from "@/components/core/loadingSkeletons/media/info/InfoPageHeroSkeleton";
import z from "zod";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";

const searchParamsSchema = z.object({
  title: z.string(),
  lang: z.enum(["eng", "jap"]),
});

type SearchParamsSchema = z.infer<typeof searchParamsSchema> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/anime/$animeId/")({
  component: () => <AnimeInfoPage />,
  validateSearch: (search): SearchParamsSchema => {
    const validatedSearch = searchParamsSchema.safeParse(search);
    if (validatedSearch.success) {
      return {
        ...validatedSearch.data,
        success: true,
      };
    }
    return {
      title: "",
      lang: "eng",
      success: false,
    };
  },
});

function AnimeInfoPage() {
  const { animeId } = Route.useParams();
  const { lang, title, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success || !title,
    onValidationError: () => navigate({ to: "/anime" }),
  });

  const episodesQuery = useFetchAnimeEpisodes({
    animeId,
    title,
    titleLang: lang,
  });

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo({ animeId, title, titleLang: lang });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [animeId]);

  if (isAnimeInfoLoading) {
    return (
      <main className="w-full pb-32">
        <InfoPageHeroSkeleton />
        <InfoPageAnimeEpisodes
          title={title}
          titleLang={lang}
          episodeImageFallback={undefined}
          episodesQuery={episodesQuery}
          replace={false}
          type="TV"
        />
      </main>
    );
  }

  if (animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfo) {
    const { animeInfoAnilist, animeInfoAniwatch } = animeInfo;
    return (
      <main className="w-full pb-32">
        <AnimeInfoPageHero
          episodesQuery={episodesQuery}
          animeId={animeId}
          title={title}
          titleLang={lang}
          cover={animeInfoAnilist.cover}
          image={animeInfoAnilist.image || animeInfoAniwatch.info.poster}
          description={
            animeInfoAnilist.description || animeInfoAniwatch.info.description
          }
          genres={animeInfoAnilist.genres || undefined}
          status={animeInfoAnilist.status}
          totalEpisodes={animeInfoAnilist.totalEpisodes}
          type={animeInfoAnilist.type || animeInfoAniwatch.info.stats.type}
          year={animeInfoAnilist.releaseDate}
          rating={
            (animeInfoAnilist.rating * 0.1).toFixed(1) ||
            (animeInfoAniwatch.moreInfo.malscore
              ? parseInt(animeInfoAniwatch.moreInfo.malscore).toFixed(1)
              : null) ||
            null
          }
        />
        <InfoPageAnimeEpisodes
          title={title}
          titleLang={lang}
          episodesQuery={episodesQuery}
          replace={false}
          type={animeInfoAnilist.type}
          episodeImageFallback={
            animeInfoAnilist.cover ||
            animeInfoAnilist.image ||
            animeInfoAniwatch.info.poster
          }
        />
        {animeInfoAnilist.recommendations &&
          animeInfoAnilist.recommendations.length !== 0 && (
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
