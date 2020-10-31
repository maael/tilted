import { Dispatch, SetStateAction, useState } from 'react'

// eslint-disable-next-line no-shadow
export enum LocalStorageKeys {
  RESULTS = 'TILTED_RESULTS',
}

export default function useLocalStorage<T>(
  key: LocalStorageKeys,
  initialValue: T,
  options: Partial<{ keySuffix: string }> = {}
) {
  const fullKey = `${key}${options.keySuffix ? `:${options.keySuffix}` : ''}`
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(fullKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(fullKey, JSON.stringify(valueToStore))
    } catch (error) {
      // Do nothing
    }
  }

  return [storedValue, setValue] as [T, Dispatch<SetStateAction<T>>]
}
