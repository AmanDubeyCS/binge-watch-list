"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const retainScrollPattern =
      /^\/(movies|tv|anime|manga|game)(\/\d+\/(character|collection|episodes|season|media|recommendations|review))?$/

    if (!retainScrollPattern.test(pathname)) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
