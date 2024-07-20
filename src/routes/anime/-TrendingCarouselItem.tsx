import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, Play } from "lucide-react";

type AnimeHeroComponentProps = {
  image: string;
  cover: string;
  title: string;
  description: string;
  id: string;
  year?: number;
  type?: string;
  trendingRank?: number;
  genres?: string[];
};

export default function TrendingCarouselItem({
  image,
  cover,
  title,
  description,
  id,
  //   year,
  type,
  trendingRank,
  genres,
}: AnimeHeroComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center w-[1440px] mx-auto pt-32 pb-12">
      <div className="flex w-full gap-16 pl-24">
        <div className="aspect-[3/4] h-[350px] rounded-xl overflow-hidden z-10">
          <img src={image} />
        </div>
        <div className="max-w-[65%] z-10 relative flex flex-col justify-center gap-6">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="text-xl font-semibold text-mainAccent">
                #{trendingRank}
              </span>{" "}
              in trending
            </p>
            <p className="text-4xl font-bold line-clamp-2">{title}</p>
          </div>
          <div className="flex flex-col justify-center w-[75%] gap-4">
            <div className="relative overflow-hidden">
              <p className="line-clamp-3">
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
              </p>
            </div>
            <div className="flex gap-5 my-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  navigate({
                    to: "/anime/info/$animeId",
                    params: {
                      animeId: id,
                    },
                    state: {
                      animeInfoPageNavigationState: {
                        image: image,
                        cover: cover,
                        genres: genres!,
                        description: description,
                        type: type!,
                      },
                    },
                  });
                }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
