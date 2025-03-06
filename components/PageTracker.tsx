"use client"

import { useEffect } from "react"
import { useSendEvent } from "./useSendEvents"

interface Props {
  title: string
  properties?: Record<string, any>
}
export function PageTracker({ title, properties }: Props) {
  const { trackPageView } = useSendEvent()
  useEffect(() => {
    if (title) {
      trackPageView({ title, properties })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, title])

  return <></>
}
