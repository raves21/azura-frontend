import { DependencyList, useEffect, useRef } from "react";

type Args = {
  deps?: DependencyList;
};

export function useFocusInput({ deps = [] }: Args) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [...deps]);

  return {
    searchInputRef,
  };
}
