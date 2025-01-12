"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  fallback?: JSX.Element
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(true)

  const handleError = () => {
    setIsLoaded(false)
  }

  return isLoaded ? (
    <Image
      src={src ? src : "/"}
      alt={alt}
      onError={handleError}
      width={300}
      height={300}
      className={cn("h-full object-cover md:min-h-[210px]", className)}
    />
  ) : (
    fallback || null
  )
}
