/**
 * useLocalStorage Hook
 *
 * Persists state to localStorage with automatic serialization/deserialization.
 * Used by the Checklist feature to persist user progress across sessions.
 *
 * @module hooks/useLocalStorage
 */

import { useState, useCallback } from 'react';

/**
 * Custom hook that syncs state with localStorage.
 *
 * @template T
 * @param {string} key - The localStorage key.
 * @param {T} initialValue - The initial value if nothing is stored.
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} State and setter.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((previousValue) => {
          const valueToStore = value instanceof Function ? value(previousValue) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
