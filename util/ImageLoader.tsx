"use client"
import Image from "next/image"
import { useState } from "react"

interface ImageLoaderProps {
  src: string
  alt: string
  fallback?: JSX.Element
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(true)

  const handleError = () => {
    setIsLoaded(false)
  }

  return isLoaded ? (
    <Image
      src={src ? src : ""}
      alt={alt}
      onError={handleError}
      width={300}
      height={300}
      className="h-full min-h-[210px] object-cover"
    />
  ) : (
    fallback || null
  )
}
