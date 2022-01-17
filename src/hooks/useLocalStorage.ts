import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, defaultValue: unknown) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null) {
      return JSON.parse(jsonValue)
    }

    if (typeof defaultValue === 'function') {
      return defaultValue()
    }

    return defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
