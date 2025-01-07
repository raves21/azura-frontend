import { useNavigate } from "@tanstack/react-router";
import {
  AnimeEpisodesData,
  Status,
} from "@/utils/types/thirdParty/animeAnilist";
import { UseQueryResult } from "@tanstack/react-query";
import { useChunkAnimeEpisodes } from "@/services/thirdParty/anime/queries/animeQueries";
import InfoSectionBackgroundImage from "@/components/shared/info/InfoSectionBackgroundImage";
import Rating from "@/components/shared/info/Rating";
import Description from "@/components/shared/info/Description";
import InfoSectionPoster from "@/components/shared/info/InfoSectionPoster";
import GenreList from "@/components/shared/info/GenreList";
import PlayNowButton from "@/components/shared/info/PlayNowButton";
import AddToListButton from "@/components/shared/info/AddToListButton";
import YearAndStatus from "@/components/shared/info/YearAndStatus";
import Title from "@/components/shared/info/Title";
import InfoDetails from "@/components/shared/info/InfoDetails";
import { cn } from "@/lib/utils";
import InfoItem from "@/components/shared/info/InfoItem";
import {
  animeCancelledStatus,
  animeCompletedStatus,
  animeOngoingStatus,
} from "@/utils/variables/anime";

type AnimeHeroComponentProps = {
  image: string | undefined;
  cover: string | undefined;
  title: string | undefined;
  description: string | undefined;
  totalEpisodes: number | undefined;
  year: number | undefined;
  type: string | undefined;
  status: string | undefined;
  genres: string[] | undefined;
  rating: number | null | undefined;
  animeId: string;
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
};

export default function AnimeInfoPageHero({
  image,
  cover,
  title,
  description,
  totalEpisodes,
  year,
  type,
  status,
  genres,
  rating,
  animeId,
  episodesQuery,
}: AnimeHeroComponentProps) {
  const navigate = useNavigate();
  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkAnimeEpisodes(episodesQuery.data);

  return (
    <section className="relative flex justify-center w-full text-sm md:text-base">
      <InfoSectionBackgroundImage image={cover ?? image} variant="infoPage" />
      <div className="flex flex-col items-center w-full gap-2 pt-32 pb-12 lg:pt-36 lg:gap-14 lg:flex-row lg:items-start">
        <InfoSectionPoster image={image} variant="infoPage" />
        <div className="relative flex flex-col items-center flex-1 gap-3 mt-3 lg:mt-0 lg:items-start">
          <Title title={title} variant="infoPage" />
          <Rating variant="infoPage" rating={rating} isMobile={false} />
          <InfoDetails isMobile={false}>
            <div className="flex gap-10">
              <InfoItem label="Year:" info={year?.toString()} />
              <InfoItem
                label="Total Episodes:"
                info={totalEpisodes?.toString()}
              />
              <InfoItem
                label="Status:"
                info={status}
                infoClassName={
                  status &&
                  cn("font-semibold text-orange-500", {
                    "text-green-500": animeOngoingStatus.includes(
                      status as Status
                    ),
                    "text-blue-500": animeCompletedStatus.includes(
                      status as Status
                    ),
                    "text-red-500": animeCancelledStatus.includes(
                      status as Status
                    ),
                  })
                }
              />
              <InfoItem label="Type:" info={type} />
            </div>
            <GenreList
              variant="infoPage"
              genres={genres}
              gotoLink="/anime/catalog"
              className="w-full"
              genreListContainerClassName="max-w-[70%]"
            />
          </InfoDetails>
          <YearAndStatus year={year} status={status} />
          <div className="flex gap-5 my-3">
            <PlayNowButton
              disabled={
                episodesQuery.isLoading ||
                episodesQuery.isError ||
                isChunkEpisodesLoading ||
                !chunkedEpisodes
              }
              onClick={() => {
                chunkedEpisodes &&
                  navigate({
                    to: "/anime/$animeId/watch",
                    params: { animeId: animeId },
                    search: {
                      id: chunkedEpisodes[0].episodes[0].id.replace(/^\//, ""),
                    },
                  });
              }}
            />
            <AddToListButton />
          </div>

          <Description
            description={description}
            className="w-full gap-3 mt-5 lg:mt-0 lg:w-[75%] xl:w-[70%]"
            showDescriptionLabel
          />
          <InfoDetails className="mt-14" isMobile>
            <div className="flex flex-col gap-3">
              <InfoItem label="Year:" info={year?.toString()} />
              <InfoItem
                label="Total Episodes:"
                info={totalEpisodes?.toString()}
              />
              <InfoItem
                label="Status:"
                info={status}
                infoClassName={
                  status &&
                  cn("font-semibold text-orange-500", {
                    "text-green-500": animeOngoingStatus.includes(
                      status as Status
                    ),
                    "text-blue-500": animeCompletedStatus.includes(
                      status as Status
                    ),
                    "text-red-500": animeCancelledStatus.includes(
                      status as Status
                    ),
                  })
                }
              />
              <InfoItem label="Type:" info={type} />
            </div>
            <GenreList
              variant="infoPage"
              genres={genres}
              gotoLink="/anime/catalog"
            />
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Score:</p>
              <Rating variant="infoPage" isMobile rating={rating} />
            </div>
          </InfoDetails>
        </div>
      </div>
    </section>
  );
}
