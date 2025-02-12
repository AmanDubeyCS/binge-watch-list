"use client"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export function OverviewText({
  overview,
  classname,
}: {
  overview: string
  classname?: string
}) {
  const [showFull, setShowFull] = useState(false)
  return (
    <p
      onClick={() => setShowFull((prev) => !prev)}
      className={cn(
        "line-clamp-4 text-sm text-gray-300",
        showFull && "line-clamp-none",
        classname
      )}
    >
      {overview}
    </p>
  )
}
