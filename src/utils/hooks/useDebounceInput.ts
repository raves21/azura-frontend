import { useState, useEffect } from "react";

type UseDebounceInputArgs = {
  value: string;
  delay: number;
};

export function useDebounceInput({ value, delay }: UseDebounceInputArgs) {
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
