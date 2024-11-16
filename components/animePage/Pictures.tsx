import { useAnimePictures } from "@/queries/jikan/animefetch"
import Image from "next/image"
import React from "react"

interface ImageFormat {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface AnimeImages {
  jpg: ImageFormat
  webp: ImageFormat
}

export function Pictures({ animeID }: { animeID: number }) {
  const { data, isLoading } = useAnimePictures(animeID)

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 rounded-lg bg-white p-6 shadow-md">
      {data &&
        data.map((img: AnimeImages, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={img.jpg.image_url}
              alt=""
              width={225}
              height={316}
              className="h-[315px] w-auto"
            />
          </div>
        ))}
    </div>
  )
}
