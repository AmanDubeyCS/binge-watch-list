import debounce from "lodash/debounce"
import { useState, useEffect, useCallback } from "react"

export const useDebounce = (value: string, delay = 600) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const handleStatusChangeDebounced = useCallback(
    debounce(() => {
      setDebouncedValue(value)
    }, delay),
    [value]
  )

  useEffect(() => {
    handleStatusChangeDebounced()

    return () => {
      handleStatusChangeDebounced.cancel()
    }
  }, [value])

  return debouncedValue
}
