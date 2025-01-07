import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

type ScrollPosition = {
  x: number;
  y: number;
};

export function useCustomScrollRestoration(key?: string) {
  const { pathname } = useLocation();
  const scrollPositionKey = key || pathname;

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(scrollPositionKey);

    if (savedScrollPosition) {
      const { x, y } = JSON.parse(savedScrollPosition) as ScrollPosition;
      window.scrollTo(x, y);
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollPositionKey]);

  function saveScrollPosition() {
    const scrollPosition: ScrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
    };

    sessionStorage.setItem(scrollPositionKey, JSON.stringify(scrollPosition));
  }

  useEffect(() => {
    window.addEventListener("scroll", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);
}
