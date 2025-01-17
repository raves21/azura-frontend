import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/custom-carousel";
import { ReactNode } from "react";

type TrendingHeroCarouselProps<T> = {
  carouselItems: T[];
  renderCarouselItems: (carouselItem: T, index: number) => ReactNode;
};

export default function TrendingHeroCarousel<T>({
  carouselItems,
  renderCarouselItems
}: TrendingHeroCarouselProps<T>) {
  return (
    <Carousel>
      <CarouselContent>
        {carouselItems.map((carouselItem, index) =>
          renderCarouselItems(carouselItem, index)
        )}
      </CarouselContent>
      <CarouselPrevious
        carouselType="hero-carousel"
        className="absolute left-0 ml-2 border-none md:ml-5 xl:ml-6 bg-black/40 hover:bg-mainAccent"
      />
      <CarouselNext
        carouselType="hero-carousel"
        className="absolute right-0 mr-2 border-none md:mr-5 xl:mr-6 bg-black/40 hover:bg-mainAccent"
      />
    </Carousel>
  );
}
