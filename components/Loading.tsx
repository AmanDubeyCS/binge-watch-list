"use client"
import Lottie from "lottie-react"
import loading from "@/assets/amongUs-loading.json"

const Loading = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-gray-50">
      <Lottie animationData={loading} />
    </div>
  )
}

export default Loading
