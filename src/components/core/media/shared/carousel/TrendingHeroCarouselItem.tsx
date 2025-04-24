import { LinkProps, useNavigate } from "@tanstack/react-router";
import { Bookmark, Play } from "lucide-react";
import { CarouselItem } from "@/components/ui/custom-carousel";

type Props = {
  posterImage: string;
  backgroundImage: string | null | undefined;
  title: string;
  description: string;
  trendingRank: number;
  toInfoPageLinkProps: LinkProps;
};

export default function TrendingHeroCarouselItem({
  posterImage,
  backgroundImage,
  title,
  description,
  toInfoPageLinkProps,
  trendingRank,
}: Props) {
  const navigate = useNavigate();

  return (
    <CarouselItem className="relative w-full h-[350px] mobile-m:h-[380px] mobile-l:h-[400px] sm:h-[420px] md:h-[450px] lg:h-[500px] xl:h-[525px]">
      <div className="flex items-end justify-center lg:items-center size-full lg:pt-20">
        <div className="w-full px-2 sm:px-3 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px]">
          <div className="flex items-center w-full gap-16">
            <div className="aspect-[3/4] w-[230px] rounded-xl overflow-hidden z-10 lg:block hidden">
              <img src={posterImage} className="object-cover size-full" />
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
                    onClick={() => navigate({ ...toInfoPageLinkProps })}
                    className="flex items-center gap-1 px-3 py-2 transition-transform duration-200 rounded-full sm:gap-2 mobile-l:px-4 sm:px-5 bg-mainAccent hover:scale-[1.02]"
                  >
                    <Play size={20} />
                    <p className="text-sm font-medium sm:text-base">Play Now</p>
                  </button>
                  <button className="hover:scale-[1.02] transition-transform duration-200 flex items-center gap-1 px-3 py-2 bg-black rounded-full sm:gap-2 mobile-l:px-4 sm:px-5">
                    <Bookmark size={20} />
                    <p className="text-sm font-medium sm:text-base">
                      Collection
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-full left-1/2 ml-[-50vw] h-full">
        <div className="absolute bg-black/60 size-full backdrop-blur-[1px]"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-0% to-transparent to-80% size-full"></div>
        <img
          src={backgroundImage || posterImage}
          className="object-cover object-center size-full"
        />
      </div>
    </CarouselItem>
  );
}
