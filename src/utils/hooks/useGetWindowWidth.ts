import { useState, useEffect } from "react";

export function useGetWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleScreenResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return width;
}
