import { useState, useEffect, useRef } from "react";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import Description from "@/components/shared/info/Description";
import Rating from "@/components/shared/info/Rating";
import InfoSectionBackgroundImage from "@/components/shared/info/InfoSectionBackgroundImage";
import InfoSectionPoster from "@/components/shared/info/InfoSectionPoster";
import GenreList from "@/components/shared/info/GenreList";
import Title from "@/components/shared/info/Title";
import InfoItem from "@/components/shared/info/InfoItem";
import { cn } from "@/lib/utils";
import { Status } from "@/utils/types/animeAnilist";
import {
  animeCancelledStatus,
  animeCompletedStatus,
  animeOngoingStatus,
} from "@/utils/variables/anime";

type AnimeInfoProps = {
  cover: string | undefined;
  image: string | undefined;
  title: string | undefined;
  description: string | undefined;
  totalEpisodes: number | undefined;
  year: number | undefined;
  type: string | undefined;
  status: string | undefined;
  genres: string[] | undefined;
  rating: number | null | undefined;
};

export default function EpisodeAnimeInfo({
  cover,
  image,
  description,
  totalEpisodes,
  year,
  type,
  title,
  status,
  genres,
  rating,
}: AnimeInfoProps) {
  const [desktopDescriptionHeight, setDesktopDescriptionHeight] = useState(0);
  const desktopDescriptionRef = useRef<HTMLDivElement | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [starsFillWidthPercentage, setStarsFillWidthPercentage] = useState(0);
  const starsFillWidthRef = useRef<HTMLDivElement | null>(null);
  const [mobileDesriptionHeight, setMobileDesriptionHeight] = useState(0);
  const mobileDesriptionRef = useRef<HTMLDivElement | null>(null);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (starsFillWidthRef.current && rating) {
      setStarsFillWidthPercentage(rating * 10);
    }
  }, []);

  useEffect(() => {
    if (desktopDescriptionRef.current) {
      setDesktopDescriptionHeight(
        desktopDescriptionRef.current.getBoundingClientRect().height
      );
    }
    if (mobileDesriptionRef.current) {
      setMobileDesriptionHeight(
        mobileDesriptionRef.current.getBoundingClientRect().height
      );
    }
  }, [windowWidth]);

  return (
    <section className="relative flex flex-col w-full gap-6 py-[90px] mt-8 mb-5 justfy-center">
      <InfoSectionBackgroundImage image={cover ?? image} variant="watchPage" />
      <div className="z-10 flex gap-3 sm:gap-5 md:gap-8 lg:gap-12 size-full">
        <InfoSectionPoster image={image} variant="watchPage" />
        <section className="z-10 flex flex-col flex-1 gap-2 sm:gap-3">
          <Title title={title} variant="watchPage" />
          <div className="flex flex-col gap-2 mobile-m:gap-4">
            <Rating
              variant="watchPage"
              rating={rating}
              starsFillWidthPercentage={starsFillWidthPercentage}
              starsFillWidthRef={starsFillWidthRef}
            />
            <div className="flex flex-col gap-2 text-xs sm:text-base mobile-m:gap-3 md:gap-4 lg:gap-8 lg:items-center lg:flex-row">
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
              isMobile={false}
              genres={genres}
              gotoLink="/anime/catalog"
              variant="watchPage"
            />
          </div>
          <Description
            showDescriptionLabel={false}
            description={description}
            descriptionHeight={desktopDescriptionHeight}
            descriptionRef={desktopDescriptionRef}
            readMore={readMore}
            setReadMore={setReadMore}
            className="hidden lg:block"
          />
        </section>
      </div>
      <div className="z-10 w-full space-y-4 lg:space-y-0">
        <GenreList
          isMobile
          genres={genres}
          gotoLink="/anime/catalog"
          variant="watchPage"
        />
        <Description
          showDescriptionLabel={false}
          description={description}
          descriptionHeight={mobileDesriptionHeight}
          descriptionRef={mobileDesriptionRef}
          readMore={readMore}
          setReadMore={setReadMore}
          className="w-full text-sm lg:hidden sm:text-base"
        />
      </div>
    </section>
  );
}
