"use client"
import Lottie from "lottie-react"
import loading from "@/assets/amongUs-loading.json"

const Loading = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Lottie animationData={loading} />
      <p className="text-bold text-xl">LOADING...</p>
    </div>
  )
}

export default Loading
