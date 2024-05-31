/** @format */

import { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;
