import { RefObject, useEffect } from "react";

type Args = {
  ref: RefObject<HTMLElement | undefined>;
  callBack: () => void;
};

export const useHandleClickOutside = ({ ref, callBack }: Args) => {
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
