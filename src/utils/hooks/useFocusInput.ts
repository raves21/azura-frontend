import { DependencyList, useEffect, useRef } from "react";

type Args = {
  deps?: DependencyList;
};

export function useFocusInput({ deps = [] }: Args) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [...deps]);

  return {
    inputRef,
  };
}
