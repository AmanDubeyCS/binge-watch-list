import { GameDiscoverPage } from "@/components/gamePage/GameDiscoveryPage"
import Loading from "@/components/Loading"
import React, { Suspense } from "react"

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <GameDiscoverPage />
    </Suspense>
  )
}
