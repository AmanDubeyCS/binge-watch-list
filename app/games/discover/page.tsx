import { GameDiscoverPage } from "@/components/gamePage/GameDiscoveryPage"
import React, { Suspense } from "react"

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameDiscoverPage />
    </Suspense>
  )
}
