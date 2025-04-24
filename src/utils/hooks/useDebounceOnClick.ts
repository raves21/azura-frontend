import { useEffect, useRef } from "react";

type Args = {
  toggleState: boolean;
  action: () => void;
};

//1 second
const DEBOUNCE_DELAY = 1000;

export function useDebounceOnClick({ action, toggleState }: Args) {
  const timeOutRef = useRef<NodeJS.Timeout>();
  const isMounted = useRef(false);

  useEffect(() => {
    //this causes the useEffect to skip the first render (need to disable strictmode to work)
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      action();
    }, DEBOUNCE_DELAY);
  }, [toggleState]);
}
