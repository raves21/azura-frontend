import { useEffect, useRef } from "react";

type UseDebounceOnClickArgs = {
  toggleState: boolean;
  action: () => void;
  skipFirstRender: boolean;
};

//1 second
const DEBOUNCE_DELAY = 1000;

export function useDebounceOnClick({
  action,
  toggleState,
  skipFirstRender,
}: UseDebounceOnClickArgs) {
  const timeOutRef = useRef<NodeJS.Timeout>();
  const isMounted = useRef(false);

  useEffect(() => {
    //this causes the useEffect to skip the first render (need to disable strictmode to work)
    if (skipFirstRender && !isMounted.current) {
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
