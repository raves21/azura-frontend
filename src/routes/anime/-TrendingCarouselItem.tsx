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
  genres: string[];
};

export default function TrendingCarouselItem({
  image,
  cover,
  title,
  description,
  id,
  type,
  trendingRank,
  genres,
}: AnimeHeroComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full h-[80dvh] max-h-[600px] items-center pt-20">
      <div className="relative flex justify-center w-[1440px] px-24">
        <div className="flex items-center w-full gap-16">
          <div className="aspect-[3/4] h-[300px] rounded-xl overflow-hidden z-10">
            <img src={image} className="object-cover size-full" />
          </div>
          <div className="relative z-10 flex-1">
            <div className="relative flex flex-col w-[70%] gap-4">
              <p className="text-lg">
                <span className="text-2xl font-bold text-mainAccent">
                  #{trendingRank}
                </span>{" "}
                in trending
              </p>
              <p className="text-3xl font-bold">{title}</p>
              <p className="text-gray-400 line-clamp-3">
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
                {/* <div className="flex text-lg">
                  {genres.map((genre, i) => {
                    return (
                      <div
                        className={`flex items-center text-gray-400 gap-2 ${i !== 0 ? "ml-2" : ""}`}
                      >
                        <p>{genre}</p>
                        {i !== genres.length - 1 && (
                          <div className="bg-gray-400 rounded-full size-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div> */}
              </p>
              <div className="flex gap-5 my-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    navigate({
                      to: "/anime/$animeId",
                      params: {
                        animeId: id,
                      },
                      state: {
                        animeInfoPageNavigationState: {
                          id: id,
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
                  whileHover={{ scale: 1.03 }}
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
    </div>
  );
}
