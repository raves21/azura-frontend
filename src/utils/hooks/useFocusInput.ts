import { useEffect, useRef } from "react";

type UseFocusInputArgs = {
  deps: any[];
};

export function useFocusInput({ deps = [] }: UseFocusInputArgs) {
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
