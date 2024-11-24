import { useNavigate } from "@tanstack/react-router";
import { Bookmark, Play } from "lucide-react";

type AnimeHeroComponentProps = {
  image: string;
  title: string;
  description: string;
  id: string;
  trendingRank?: number;
};

export default function TrendingCarouselItem({
  image,
  title,
  description,
  id,
  trendingRank,
}: AnimeHeroComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-end justify-center lg:items-center size-full lg:pt-20">
      <div className="w-full px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px]">
        <div className="flex items-center w-full gap-16">
          <div className="aspect-[3/4] w-[230px] rounded-xl overflow-hidden z-10 lg:block hidden">
            <img src={image} className="object-cover size-full" />
          </div>
          <div className="z-10 flex-1">
            <div className="flex flex-col sm:w-[80%] xl:w-[70%] gap-4">
              <div className="space-y-3">
                <p className="mb-auto text-lg">
                  <span className="text-2xl font-bold text-mainAccent">
                    #{trendingRank}
                  </span>{" "}
                  in trending
                </p>
                <h1 className="text-xl font-bold sm:text-2xl md:text-3xl line-clamp-2">
                  {title}
                </h1>
              </div>
              <p className="hidden text-gray-400 lg:line-clamp-3">
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
              </p>
              <div className="flex gap-2 sm:gap-4 sm:my-4">
                <button
                  onClick={() => {
                    navigate({
                      to: "/anime/$animeId",
                      params: {
                        animeId: id,
                      },
                    });
                  }}
                  className="flex items-center gap-1 px-3 py-2 transition-transform duration-200 rounded-full sm:gap-2 mobile-l:px-4 sm:px-5 bg-mainAccent hover:scale-[1.02]"
                >
                  <Play size={20} />
                  <p className="text-sm font-medium sm:text-base">Play Now</p>
                </button>
                <button className="hover:scale-[1.02] transition-transform duration-200 flex items-center gap-1 px-3 py-2 bg-black rounded-full sm:gap-2 mobile-l:px-4 sm:px-5">
                  <Bookmark size={20} />
                  <p className="text-sm font-medium sm:text-base">
                    Add to List
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
