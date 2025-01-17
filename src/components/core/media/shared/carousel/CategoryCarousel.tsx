import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";
import { LinkProps } from "@tanstack/react-router";

type AnimeCategoryCarouselProps<T> = {
  categoryName: string;
  gotoLinkProps?: LinkProps;
  carouselItems: T[];
  renderCarouselItems: (item: T, index: number) => React.ReactNode;
};

export default function CategoryCarousel<T>({
  categoryName,
  carouselItems,
  renderCarouselItems,
  gotoLinkProps,
}: AnimeCategoryCarouselProps<T>) {
  return (
    <div className="w-full pt-5 space-y-6 text-gray-400">
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold sm:text-xl lg:text-2xl">
          {categoryName}
        </p>
        {gotoLinkProps && (
          <Link
            {...gotoLinkProps}
            className="flex items-center gap-1 px-3 py-2 transition-all duration-300 border border-gray-400 rounded-full lg:px-4 group hover:border-mainAccent"
          >
            <p className="text-xs transition-all duration-300 md:text-base group-hover:text-mainAccent whitespace-nowrap">
              See All
            </p>
            <ChevronRight className="transition-colors duration-300 size-4 md:size-5 lg:size-6 group-hover:stroke-mainAccent" />
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          slidesToScroll: 3,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {carouselItems.map((carouselItem, i) =>
            renderCarouselItems(carouselItem, i)
          )}
        </CarouselContent>
        <CarouselPrevious
          carouselType="category-carousel"
          className="absolute left-0 border-none bg-gradient-to-r from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
        />
        <CarouselNext
          carouselType="category-carousel"
          className="absolute right-0 border-none bg-gradient-to-l from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
        />
      </Carousel>
    </div>
  );
}
