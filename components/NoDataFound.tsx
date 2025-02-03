import Lottie from "lottie-react"
import React from "react"
import notFound from "@/assets/noResultsFound.json"

export function NoDataFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Lottie animationData={notFound} />
      <p className="text-bold text-xl">NO DATA FOUND</p>
    </div>
  )
}
