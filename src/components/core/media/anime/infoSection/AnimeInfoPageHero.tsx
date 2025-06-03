import { useNavigate } from "@tanstack/react-router";
import {
  AnimeGenre,
  AnimeStatus,
} from "@/utils/types/media/anime/animeAnilist";
import { UseQueryResult } from "@tanstack/react-query";
import { useChunkAnimeEpisodes } from "@/services/media/anime/queries";
import InfoSectionBackgroundImage from "@/components/core/media/shared/info/InfoSectionBackgroundImage";
import Rating from "@/components/core/media/shared/info/Rating";
import Description from "@/components/core/media/shared/info/Description";
import InfoSectionPoster from "@/components/core/media/shared/info/InfoSectionPoster";
import GenreListAnime from "@/components/core/media/shared/info/GenreListAnime";
import PlayNowButton from "@/components/core/media/shared/info/PlayNowButton";
import ToggleMediaToCollectionButton from "@/components/core/media/shared/toggleMediaToCollection/ToggleMediaToCollectionButton";
import YearAndStatus from "@/components/core/media/shared/info/YearAndStatus";
import Title from "@/components/core/media/shared/info/Title";
import InfoDetails from "@/components/core/media/shared/info/InfoDetails";
import { cn } from "@/lib/utils";
import InfoItem from "@/components/core/media/shared/info/InfoItem";
import {
  animeCancelledStatus,
  animeCompletedStatus,
  animeOngoingStatus,
} from "@/utils/variables/media/anime";
import { AnimeEpisodesData } from "@/utils/types/media/anime/shared";
import ShareMediaButton from "../../shared/info/ShareMediaButton";

type Props = {
  image: string | undefined;
  cover: string | undefined;
  title: string;
  titleLang: "eng" | "jap";
  description: string | undefined;
  totalEpisodes: number | undefined;
  year: number | undefined;
  type: string | undefined;
  status: string | undefined;
  genres: AnimeGenre[] | undefined;
  rating: string | null | undefined;
  animeId: string;
  episodesQuery: UseQueryResult<AnimeEpisodesData, Error>;
};

export default function AnimeInfoPageHero({
  image,
  cover,
  title,
  description,
  titleLang,
  totalEpisodes,
  year,
  type,
  status,
  genres,
  rating,
  animeId,
  episodesQuery,
}: Props) {
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
          <Rating
            mediaType="anime"
            variant="infoPage"
            rating={rating}
            isMobile={false}
          />
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
                      status as AnimeStatus
                    ),
                    "text-blue-500": animeCompletedStatus.includes(
                      status as AnimeStatus
                    ),
                    "text-red-500": animeCancelledStatus.includes(
                      status as AnimeStatus
                    ),
                  })
                }
              />
              <InfoItem label="Type:" info={type} />
            </div>
            <GenreListAnime
              variant="infoPage"
              genres={genres}
              className="w-full"
              genreListContainerClassName="max-w-[70%]"
            />
          </InfoDetails>
          <YearAndStatus year={year} status={status} />
          <div className="flex gap-5 my-3 flex-wrap justify-center">
            <PlayNowButton
              isDisabled={episodesQuery.isError || !chunkedEpisodes}
              isLoading={episodesQuery.isLoading || isChunkEpisodesLoading}
              onClick={() => {
                chunkedEpisodes &&
                  navigate({
                    to: "/anime/$animeId/watch",
                    params: { animeId: animeId },
                    search: {
                      id: chunkedEpisodes[0].episodes[0].id.replace(/^\//, ""),
                      lang: titleLang,
                      title,
                    },
                  });
              }}
            />
            <ToggleMediaToCollectionButton
              media={{
                id: animeId,
                type: "ANIME",
                coverImage: cover ?? null,
                description: description ?? null,
                posterImage: image ?? null,
                rating: rating?.toString() ?? null,
                status: status ?? null,
                title: title,
                year: year?.toString() ?? null,
              }}
            />
            <ShareMediaButton
              media={{
                id: animeId,
                type: "ANIME",
                coverImage: cover ?? null,
                description: description ?? null,
                posterImage: image ?? null,
                rating: rating?.toString() ?? null,
                status: status ?? null,
                title: title,
                year: year?.toString() ?? null,
              }}
            />
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
                      status as AnimeStatus
                    ),
                    "text-blue-500": animeCompletedStatus.includes(
                      status as AnimeStatus
                    ),
                    "text-red-500": animeCancelledStatus.includes(
                      status as AnimeStatus
                    ),
                  })
                }
              />
              <InfoItem label="Type:" info={type} />
            </div>
            <GenreListAnime variant="infoPage" genres={genres} />
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Score:</p>
              <Rating
                mediaType="anime"
                variant="infoPage"
                isMobile
                rating={rating}
              />
            </div>
          </InfoDetails>
        </div>
      </div>
    </section>
  );
}
