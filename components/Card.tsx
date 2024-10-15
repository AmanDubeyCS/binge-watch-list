import React, { useState } from "react"
import Image from "next/image"

import RadialProgress from "./RadialProgress"

interface Props {
  image: string
  rating?: number
  title_en: string
  title?: string
  publication?: string
}

export default function Card({
  image,
  rating,
  title_en,
  title,
  publication,
}: Props) {
  return (
    <div className="flex h-full w-[150px] flex-col gap-1">
      <div className="relative h-[215px] w-fit overflow-hidden rounded-[8px]">
        <ImageLoader
          src={image}
          alt=""
          fallback={
            <div className="flex aspect-[5/7] h-auto w-[256px] items-center justify-center bg-white text-center text-black">
              <p>Image not available</p>
            </div>
          }
        />
        {publication && (
          <div className="absolute right-1 top-1 rounded-full bg-[#9353D3] px-2 py-1">
            <p className="text-[11px] font-bold text-white">{publication}</p>
          </div>
        )}
        {rating && (
          <div className="absolute bottom-1 right-1">
            <div className="relative size-[36px] shrink-0 rounded-full bg-[#343a40]">
              <RadialProgress percentage={Math.floor(rating)} />
              <span className="text-neutrals-800 absolute left-1/2 top-1/2 flex min-h-[22px] min-w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[12px] font-[800]">
                {Math.floor(rating)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col rounded-[8px]">
        <p className="line-clamp-3 text-base font-bold text-black">
          {title_en || title}
        </p>
      </div>
    </div>
  )
}

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
      src={src}
      alt={alt}
      onError={handleError}
      width={300}
      height={300}
      className="h-[215px] w-[150px]"
    />
  ) : (
    fallback || null
  )
}
