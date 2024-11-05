import { useEffect, useState, useRef } from "react";

type UseInfoPageHeroArgs = {
  rating: number | null | undefined
}

export function useInfoPageHero({ rating }: UseInfoPageHeroArgs) {
  const [starsFillWidthPercentage, setStarsFillWidthPercentage] = useState(0);
  const starsFillWidthRef = useRef<HTMLDivElement | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

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

  return {
    starsFillWidthPercentage,
    starsFillWidthRef,
    readMore,
    setReadMore,
    descriptionHeight,
    descriptionRef,
  };
}
