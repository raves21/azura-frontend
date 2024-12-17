import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function useFetchNextPageInView(fetchNextPage: () => void) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return ref;
}
