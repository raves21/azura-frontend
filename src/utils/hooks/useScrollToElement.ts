import { DependencyList, useEffect } from "react";

type Args = {
  scrollableContainerRef: React.MutableRefObject<HTMLElement | null>;
  targetElementRef: React.MutableRefObject<HTMLElement | null>;
  deps?: DependencyList;
  condition?: boolean;
};

export function useScrollToElement({
  scrollableContainerRef,
  targetElementRef,
  deps = [],
  condition = true,
}: Args) {
  useEffect(() => {
    if (condition) {
      const scrollableContainer = scrollableContainerRef.current;
      const target = targetElementRef.current;

      if (scrollableContainer && target) {
        const scrollableContainerRect =
          scrollableContainer.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const relativeTop =
          targetRect.top -
          scrollableContainerRect.top +
          scrollableContainer.scrollTop;

        scrollableContainer.scrollTo({
          top: relativeTop,
        });
      }
    }
  }, [...deps]);
}
