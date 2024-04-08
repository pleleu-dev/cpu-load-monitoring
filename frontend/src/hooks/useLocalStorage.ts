/**
 * This hook is used to store the value in local storage.
 * @param {string} key - The key to store the value in local localStorage
 * @param {T} defaultValue - The default value to store in local useLocalStorage
 * @returns {T} - The value stored in local useLocalStorage
 */

import { useState, useEffect } from 'react'
type useLocalStorageProps<T> = {
  key: string
  defaultValue: T
}

type useLocalStorageReturn<T> = [T, (value: T) => void]

function useLocalStorage<T>({
  key,
  defaultValue,
}: useLocalStorageProps<T>): useLocalStorageReturn<T> {
  const [value, setValue] = useState(() => {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export { useLocalStorage }
