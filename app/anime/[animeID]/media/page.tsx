import { config, configTMDB } from "@/apiConfig"
import { Pictures } from "@/components/movies/Pictures"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
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

export default async function page({
  params,
  searchParams,
}: {
  params: { animeID: number }
  searchParams: { id?: string }
}) {
  const animeID = params.animeID
  const mediaId = searchParams.id
  const animeData = await fetchFromJikan(config.getAnimePictures(animeID), 0)
  const media = await animeData.data

  let tmdbMedia = null
  if (mediaId) {
    tmdbMedia = await fetchFromTMDB(configTMDB.getTvImages(Number(mediaId)))
  }

  return (
    <div>
      {tmdbMedia ? (
        <Pictures data={tmdbMedia} />
      ) : (
        <div className="flex flex-wrap justify-center gap-8 rounded-lg bg-white p-6 shadow-md">
          {media &&
            media.map((img: AnimeImages, index: number) => (
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
      )}
    </div>
  )
}
