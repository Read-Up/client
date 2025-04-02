"use client";

import { useState, useCallback } from "react";
// package
import { getCookie, setCookie, deleteCookie as delCookie, type CookieOptions } from "@readup/utils";

export function useCookie<ValueType>(name: string, defaultValue: ValueType) {
  const [value, setValue] = useState(() => {
    const cookie = getCookie(name, defaultValue);

    return typeof cookie === "function" ? cookie() : cookie;
  });

  const updateCookie = useCallback(
    (newValue: unknown, options: CookieOptions) => {
      setCookie(name, newValue, options);
      setValue(newValue);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    delCookie(name);
    setValue(defaultValue);
  }, [defaultValue, name]);

  return [value, updateCookie, deleteCookie];
}
