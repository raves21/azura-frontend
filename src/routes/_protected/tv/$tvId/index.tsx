import InfoPageHeroSkeleton from "@/components/core/loadingSkeletons/media/info/InfoPageHeroSkeleton";
import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import InfoPageTVEpisodes from "@/components/core/media/tv/episodeList/InfoPageTVEpisodes";
import TVInfoPageHero from "@/components/core/media/tv/infoSection/TVInfoPageHero";
import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/media/sharedFunctions";
import {
  useTVInfo,
  useTVRecommendations,
  useTVSeasonEpisodes
} from "@/services/media/tv/tvQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

const tvInfoPageSchema = z.object({
  s: z.number().optional()
});

export const Route = createFileRoute("/_protected/tv/$tvId/")({
  component: () => <TVInfoPage />,
  validateSearch: (search) => {
    const validated = tvInfoPageSchema.safeParse(search);
    if (validated.success) {
      return validated.data;
    }
    return { s: 1 };
  }
});

function TVInfoPage() {
  const { s } = Route.useSearch();

  const { tvId } = Route.useParams();
  const [hasMainSeasons, setHasMainSeasons] = useState(false);
  const [totalSeasons, setTotalSeasons] = useState<number | null>(null);

  const {
    data: tvRecommendations,
    isLoading: isTVRecommendationsLoading,
    error: tvRecommendationsError
  } = useTVRecommendations(tvId);

  const {
    data: tvInfo,
    isLoading: isTvInfoLoading,
    error: tvInfoError
  } = useTVInfo(tvId);

  useEffect(() => {
    if (tvInfo) {
      //only include main seasons, dont include special seasons (season 0)
      //only include released seasons, seasons with a null air_date isnt released.
      const mainTVSeasons = tvInfo.seasons.filter(
        (season) => season.season_number > 0 && season.air_date !== null
      );
      if (mainTVSeasons.length !== 0) {
        setTotalSeasons(mainTVSeasons.length);
        setHasMainSeasons(true);
      }
    }
  }, [tvInfo]);

  //only fetch the info of the first season if the TV show has main seasons and has info details
  const tvSeasonEpisodesQuery = useTVSeasonEpisodes({
    tvId,
    seasonNum: s || 1,
    enabled: !!tvInfo && hasMainSeasons
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tvId]);

  if (isTvInfoLoading || isTVRecommendationsLoading) {
    return (
      <main className="w-full pb-32">
        <InfoPageHeroSkeleton />
        <InfoPageTVEpisodes
          totalSeasons={null}
          tvSeasonEpisodesQuery={tvSeasonEpisodesQuery}
        />
      </main>
    );
  }

  if (tvInfoError || tvRecommendationsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this TV Show.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (tvInfo && tvRecommendations && totalSeasons) {
    return (
      <main className="w-full pb-32">
        <TVInfoPageHero
          tvId={tvId}
          tvSeasonEpisodes={tvSeasonEpisodesQuery.data}
          cover={getTMDBImageURL(tvInfo.backdrop_path)}
          description={tvInfo.overview}
          genres={tvInfo.genres}
          image={getTMDBImageURL(tvInfo.poster_path)}
          year={getTMDBReleaseYear(tvInfo.first_air_date)}
          runTime={tvInfo.last_episode_to_air?.runtime || null}
          status={tvInfo.status}
          title={tvInfo.name}
          voteAverage={tvInfo.vote_average}
        />
        <InfoPageTVEpisodes
          coverImage={getTMDBImageURL(tvInfo.backdrop_path)}
          totalSeasons={totalSeasons}
          tvSeasonEpisodesQuery={tvSeasonEpisodesQuery}
        />
        {tvRecommendations.results.length !== 0 && (
          <CategoryCarousel
            carouselItems={tvRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation) => {
              return (
                <CategoryCarouselItem key={recommendation.id}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{
                      to: "/tv/$tvId",
                      params: {
                        tvId: recommendation.id.toString()
                      }
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
