import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Format, Status } from "@/utils/types/animeAnilist";
import { getRatingScore } from "@/utils/functions/reusable_functions";
import { statusLabels } from "@/utils/variables/anime";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { Link } from "@tanstack/react-router";

type AnimeInfoProps = {
  cover: string | undefined;
  image: string | undefined;
  title: string | undefined;
  description: string | undefined;
  totalEpisodes: number | undefined;
  year: number | undefined;
  type: Format | undefined;
  status: Status | undefined;
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
    <main className="relative flex flex-col w-full gap-6 py-24 mb-10 justfy-center mt-14">
      <div className="absolute inset-0 size-full max-h-[500px] rounded-[inherit]">
        <div className="absolute bg-black/60 size-full backdrop-blur-[1px] rounded-[inherit]"></div>
        <div className="absolute bg-gradient-to-r from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-l from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-b from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <img
          src={cover ?? image}
          className="object-cover rounded-[inherit] size-full"
        />
      </div>
      <div className="z-10 flex gap-3 sm:gap-5 md:gap-8 lg:gap-12 size-full">
        <section className="aspect-[3/4] max-h-[180px] mobile-m:max-h-[190px] mobile-l:max-h-[200px] sm:max-h-[240px] md:max-h-[260px] lg:max-h-[300px] rounded-xl overflow-hidden z-10">
          <img src={image} className="object-cover size-full" />
        </section>
        <section className="z-10 flex flex-col flex-1 gap-2 sm:gap-3">
          <p className="text-lg font-semibold sm:text-xl line-clamp-2 md:text-2xl">
            {title}
          </p>
          <div className="flex flex-col gap-2 mobile-m:gap-4">
            <div className="flex items-center gap-2 mobile-l:gap-4 xl:ml-2 lg:my-1">
              <div
                style={{
                  WebkitMaskImage: 'url("/five-stars.svg")',
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
                className={cn(
                  "relative w-20 h-full mobile-m:w-24 sm:w-28 bg-gray-500 lg:w-32 lg:h-5 xl:h-6 lg:-ml-2"
                )}
              >
                <div
                  ref={starsFillWidthRef}
                  style={{
                    width: `${starsFillWidthPercentage}%`,
                  }}
                  className={`absolute bg-amber-400 h-full`}
                ></div>
              </div>
              <p className="text-xs font-semibold mobile-l:text-sm sm:text-base md:text-lg">
                <span className="text-mainAccent">
                  {rating ? `${getRatingScore(rating)}` : "?"}
                </span>
                /5
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs sm:text-base mobile-m:gap-3 md:gap-4 lg:gap-8 lg:items-center lg:flex-row">
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Year:</p>
                <p>{year}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Total Episodes:</p>
                <p>{totalEpisodes}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Status:</p>
                {status && (
                  <p
                    className={cn("font-semibold text-orange-500", {
                      "text-green-500": [
                        Status.Ongoing,
                        Status.RELEASING,
                      ].includes(status),
                      "text-blue-500": [
                        Status.FINISHED,
                        Status.Completed,
                      ].includes(status),
                      "text-red-500": [
                        Status.CANCELLED,
                        Status.Cancelled,
                      ].includes(status),
                    })}
                  >
                    {statusLabels[status as Status]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Type:</p>
                <p>{type}</p>
              </div>
            </div>
            <ul className="flex-wrap hidden gap-3 text-xs lg:flex lg:text-sm">
              {genres &&
                genres.map((genre) => (
                  <Link
                    to="/anime/catalog"
                    search={{
                      genres: genre,
                    }}
                    key={genre}
                    className="px-3 py-2 transition-colors border rounded-full border-mainAccent/90 hover:text-mainAccent"
                  >
                    {genre}
                  </Link>
                ))}
            </ul>
          </div>
          <div className="relative lg:block hidden gap-3 mt-2 w-[75%]">
            <motion.div
              initial={{
                height: "80px",
              }}
              animate={{
                height: readMore ? "auto" : "80px",
              }}
              transition={{
                duration: 0.2,
              }}
              style={{
                maskImage:
                  readMore || desktopDescriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
                WebkitMaskImage:
                  readMore || desktopDescriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
              }}
              className="relative overflow-hidden text-gray-400"
            >
              <p ref={desktopDescriptionRef}>
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
              </p>
            </motion.div>
            {desktopDescriptionHeight > 80 && (
              <motion.div
                animate={{
                  height: readMore ? `${desktopDescriptionHeight}px` : "80px",
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute w-full -bottom-3"
              >
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="absolute left-0 flex gap-3 -bottom-6"
                >
                  <p className="text-gray-400">
                    {readMore ? "Read Less" : "Read More"}
                  </p>
                  <ChevronDown
                    stroke="#9ca3af"
                    className={`${readMore && "rotate-180"} duration-500 transition-transform`}
                  />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <div className="z-10 w-full space-y-4 lg:space-y-0">
        <ul className="flex flex-wrap gap-2 text-xs lg:hidden mobile-m:gap-3 sm:text-sm">
          {genres &&
            genres.map((genre) => (
              <Link
                to="/anime/catalog"
                search={{
                  genres: genre,
                }}
                key={genre}
                className="px-3 py-2 transition-colors border rounded-full border-mainAccent/75 hover:text-mainAccent/75"
              >
                {genre}
              </Link>
            ))}
        </ul>
        <div className="relative text-sm sm:text-base lg:hidden">
          <motion.div
            initial={{
              height: "80px",
            }}
            animate={{
              height: readMore ? "auto" : "80px",
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              maskImage:
                readMore || mobileDesriptionHeight <= 80
                  ? ""
                  : "linear-gradient(to bottom, white 1%, transparent)",
              WebkitMaskImage:
                readMore || mobileDesriptionHeight <= 80
                  ? ""
                  : "linear-gradient(to bottom, white 1%, transparent)",
            }}
            className="relative overflow-hidden text-gray-400"
          >
            <p ref={mobileDesriptionRef}>
              {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
            </p>
          </motion.div>
          {mobileDesriptionHeight > 80 && (
            <motion.div
              animate={{
                height: readMore ? `${mobileDesriptionHeight}px` : "80px",
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute w-full -bottom-3"
            >
              <button
                onClick={() => setReadMore(!readMore)}
                className="absolute left-0 flex gap-3 -bottom-6"
              >
                <p className="text-gray-400">
                  {readMore ? "Read Less" : "Read More"}
                </p>
                <ChevronDown
                  stroke="#9ca3af"
                  className={`${readMore && "rotate-180"} duration-500 transition-transform`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
