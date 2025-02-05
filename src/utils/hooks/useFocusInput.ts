import { DependencyList, useEffect, useRef } from "react";

type UseFocusInputArgs = {
  deps: DependencyList;
};

export function useFocusInput(args?: UseFocusInputArgs) {
  const deps = args?.deps && args.deps.length > 0 ? args.deps : [];
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [...deps]);

  return {
    searchInputRef
  };
}
