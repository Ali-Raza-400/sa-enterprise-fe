import { useState, useEffect } from "react";

interface Filters {
  [key: string]: any;
}

interface DebounceValue {
  filters: Filters;
  [key: string]: any;
}

function useDebounce<T extends DebounceValue>(
  value: T,
  delay: number,
  debounceKeys: string[]
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  let handler: any;

  useEffect(() => {
    const hasChanged = debounceKeys.some(
      (key) => value?.filters?.[key] !== debouncedValue?.filters?.[key]
    );

    if (hasChanged) {
      if (handler) clearTimeout(handler);
      handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        if (handler) clearTimeout(handler);
      };
    } else {
      setDebouncedValue(value);
    }
  }, [value, delay, debounceKeys]);

  return debouncedValue;
}

export default useDebounce;
