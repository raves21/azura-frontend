import { RefObject, useEffect } from "react";

type UseHandleClickOutsideArgs = {
  ref: RefObject<HTMLElement | undefined>;
  callBack: () => void;
};

export const useHandleClickOutside = ({
  ref,
  callBack,
}: UseHandleClickOutsideArgs) => {
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
