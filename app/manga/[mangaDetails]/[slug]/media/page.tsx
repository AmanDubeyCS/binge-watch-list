import { config } from "@/apiConfig"
import { fetchFromMangaDex } from "@/util/fetchFromTMDB"
import dynamic from "next/dynamic"
import React from "react"

const ImageComponent = dynamic(() => import("next/image"), { ssr: false })

interface CoverArt {
  id: string
  type: string
  attributes: {
    description: string
    volume: string
    fileName: string
    locale: string
    createdAt: string
    updatedAt: string
    version: number
  }
  relationships: Array<{
    id: string
    type: string
  }>
}

export default async function page({ params }: { params: any }) {
  const mangaID = params.mangaDetails
  const media = await fetchFromMangaDex(config.getMangaArt(mangaID))

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {media &&
        media.total > 0 &&
        media.data.map((data: CoverArt) => (
          <ImageComponent
            src={`https://uploads.mangadex.org/covers/${mangaID}/${data?.attributes?.fileName}`}
            alt="image"
            width={1000}
            height={1000}
            className="h-[450px] w-auto shrink-0 rounded-lg"
          />
        ))}
    </div>
  )
}
