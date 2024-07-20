import { Bookmark, ChevronDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type AnimeHeroComponentProps = {
  image: string;
  cover: string;
  title: string;
  description: string;
  id: string;
  totalEpisodes?: number;
  year?: number;
  type?: string;
  status?: string;
  trendingRank?: number;
  genres?: string[];
  rating?: number | null;
};

export default function AnimeHeroComponent({
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
}: AnimeHeroComponentProps) {
  // const [clicked, setClicked] = useState(false);
  const [starsFillWidthPercentage, setStarsFillWidthPercentage] = useState(0);
  const starsFillWidthRef = useRef<HTMLDivElement | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (starsFillWidthRef.current && rating) {
      setStarsFillWidthPercentage(rating * 10);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(
        descriptionRef.current.getBoundingClientRect().height
      );
    } else {
      return;
    }
  }, []);

  return (
    <div className="relative flex justify-center w-full pt-32 pb-12 text-sm">
      <div className="absolute inset-0 w-dvw left-1/2 ml-[-50vw]">
        <div className="absolute bg-black/60 size-full backdrop-blur-sm"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
        <img src={cover ?? image} className="object-cover size-full" />
      </div>
      <div className="flex justify-center w-full gap-16">
        <div className="aspect-[3/4] h-[350px] rounded-xl overflow-hidden z-10">
          <img src={image} />
        </div>
        <div className="max-w-[65%] z-10 relative">
          <p className="text-3xl font-bold">{title}</p>
          <div className="flex flex-col justify-center w-[70%] gap-4">
            <div className="flex items-center gap-4 mt-5">
              <div
                style={{
                  WebkitMaskImage: 'url("/five-stars.svg")',
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
                className="relative self-start w-32 h-6 bg-gray-500"
              >
                <div
                  ref={starsFillWidthRef}
                  style={{
                    width: `${starsFillWidthPercentage}%`,
                  }}
                  className={`absolute bg-amber-400 size-full`}
                ></div>
              </div>
              <p className="text-lg font-semibold">
                <span className="text-mainAccent">
                  {rating ? (0.05 * (rating * 10)).toFixed(1) : "?"}
                </span>
                /5
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <p className="text-gray-400">Year:</p>
                  <p>{year}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-gray-400">Total Episodes:</p>
                  <p>{totalEpisodes}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-gray-400">Status:</p>
                  <p
                    className={`${status === "RELEASING" ? "text-green-500" : "text-blue-500"}`}
                  >
                    {status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-gray-400">Type:</p>
                  <p>{type && type !== "" ? type : "?"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Genres:</p>
                <div className="flex gap-1">
                  {genres &&
                    genres.map((genre, i) => (
                      <button key={i} className="hover:text-mainAccent">
                        {i === genres.length - 1 ? `${genre}` : `${genre},`}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex gap-5 my-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-mainAccent"
              >
                <Play size={20} />
                <p className="font-medium">Play Now</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-5 py-2 bg-black rounded-full"
              >
                <Bookmark size={20} />
                <p className="font-medium">Add to List</p>
              </motion.button>
            </div>
            <motion.div
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
          </div>
          {descriptionHeight > 80 && (
            <button
              onClick={() => setReadMore(!readMore)}
              className="absolute left-0 flex gap-3 -bottom-8"
            >
              <p className="text-gray-400">
                {readMore ? "Read Less" : "Read More"}
              </p>
              <motion.div
                animate={{
                  rotate: readMore ? -180 : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <ChevronDown stroke="#9ca3af" />
              </motion.div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
