import { useState, useEffect } from "react";

type UseDebounceArgs = {
  value: string;
  delay: number;
};

export function useDebounce({ value, delay }: UseDebounceArgs) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}
