"use client";

import { useState, useEffect } from "react";
// package
import { getLocalStorage, setLocalStorage } from "@readup/utils";

export function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
  const [value, setValue] = useState(() => {
    const storedValue = getLocalStorage(key, defaultValue);

    return storedValue;
  });

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: ValueType) => {
      const result = typeof newValue === "function" ? newValue(currentValue) : newValue;

      setLocalStorage(key, JSON.stringify(result));

      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
