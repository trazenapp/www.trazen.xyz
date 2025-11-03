"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialState);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
