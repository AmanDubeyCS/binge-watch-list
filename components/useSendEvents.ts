"use client"
import { useCallback } from "react"

export const useSendEvent = () => {
  const trackEvent = useCallback(
    ({
      title,
      properties,
    }: {
      title: string
      properties?: Record<string, any>
    }) => {
      const p = properties || {}

      try {
        if (window?.gtag) window?.gtag("event", title, p)
      } catch (error) {
        console.error(
          error instanceof Error
            ? `${error.name}: ${error.message}`
            : `${error}`
        )
      }
    },
    []
  )

  const trackPageView = useCallback(
    ({
      title,
      properties,
    }: {
      title: string
      properties?: Record<string, any>
    }) => {
      const p = properties || {}

      try {
        if (window?.gtag) {
          window?.gtag("event", title, p)
        }
      } catch (err) {
        console.log(err)
      }
    },
    []
  )

  return { trackEvent, trackPageView }
}
