import { PropsWithChildren } from "react";
import { CarouselItem } from "../../../../ui/custom-carousel";

export default function CategoryCarouselItem({ children }: PropsWithChildren) {
  return (
    <CarouselItem className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6">
      {children}
    </CarouselItem>
  );
}
