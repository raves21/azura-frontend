import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Format, Status, Genre } from "@/utils/types/animeAnilist";
import { getRatingScore } from "@/utils/functions/reusable_functions";
import { statusLabels } from "@/utils/variables/anime";

type AnimeInfoProps = {
  cover: string | undefined;
  image: string | undefined;
  title: string | undefined;
  description: string | undefined;
  totalEpisodes: number | undefined;
  year: number | undefined;
  type: Format | undefined;
  status: Status | undefined;
  genres: Genre[] | undefined;
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
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [starsFillWidthPercentage, setStarsFillWidthPercentage] = useState(0);
  const starsFillWidthRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (starsFillWidthRef.current && rating) {
      setStarsFillWidthPercentage(rating * 10);
    }
    if (descriptionRef.current) {
      setDescriptionHeight(
        descriptionRef.current.getBoundingClientRect().height
      );
    }
  }, []);

  return (
    <div className="relative flex justify-center w-full py-20 my-14">
      <div className="absolute inset-0 size-full max-h-[600px] rounded-[inherit]">
        <div className="absolute bg-black/65 size-full backdrop-blur-[1px] rounded-[inherit]"></div>
        <div className="absolute bg-gradient-to-r from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-l from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-b from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <img
          src={cover ?? image}
          className="object-cover rounded-[inherit] size-full"
        />
      </div>
      <div className="flex gap-12 size-full">
        <div className="aspect-[3/4] h-[280px] rounded-xl overflow-hidden z-10">
          <img src={image} className="object-cover size-full" />
        </div>
        <div className="z-10 flex flex-col flex-1 gap-3">
          <p className="text-2xl font-semibold">{title}</p>
          <div className="items-center hidden gap-4 ml-2 lg:flex lg:my-1">
            <div
              style={{
                WebkitMaskImage: 'url("/five-stars.svg")',
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              className="relative w-32 h-5 bg-gray-500 xl:h-6 lg:-ml-2"
            >
              <div
                ref={starsFillWidthRef}
                style={{
                  width: `${starsFillWidthPercentage}%`,
                }}
                className={`absolute bg-amber-400 h-full`}
              ></div>
            </div>
            <p className="text-lg font-semibold">
              <span className="text-mainAccent">
                {rating ? `${getRatingScore(rating)}` : "?"}
              </span>
              /5
            </p>
          </div>
          <div className="flex items-center gap-8">
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
              <p className="text-blue-500">{statusLabels[status as Status]}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Type:</p>
              <p>{type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400">Genres:</p>
            {genres ? (
              <ul className="flex flex-wrap gap-3 text-sm">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className="px-3 py-2 transition-colors border rounded-full border-mainAccent/60 hover:text-mainAccent"
                  >
                    {genre}
                  </button>
                ))}
              </ul>
            ) : <p>N/A</p>}
          </div>
          <div className="relative flex flex-col w-full gap-3 mt-5 lg:mt-0 lg:w-[75%] xl:w-[70%]">
            <p className="text-lg font-semibold lg:hidden">Description</p>
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
                  readMore || descriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
                WebkitMaskImage:
                  readMore || descriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
              }}
              className="relative overflow-hidden text-gray-400"
            >
              <p ref={descriptionRef}>
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
              </p>
            </motion.div>
            {descriptionHeight > 80 && (
              <motion.div
                animate={{
                  height: readMore ? `${descriptionHeight}px` : "80px",
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
      </div>
    </div>
  );
}
