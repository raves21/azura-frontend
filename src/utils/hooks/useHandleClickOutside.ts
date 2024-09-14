import { RefObject, useEffect } from "react";

export const useHandleClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  callBack: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callBack();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};
