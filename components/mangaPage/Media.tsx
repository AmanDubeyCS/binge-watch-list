import { useGetMangaArt } from "@/quries/mangaDex/mangaFetch"
import Image from "next/image"
import React from "react"

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

export function Media({ mangaId }: { mangaId: string }) {
  const { data } = useGetMangaArt(mangaId)

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {data &&
        data.length > 0 &&
        data.map((data: CoverArt) => (
          <Image
            src={`https://mangadex.org/covers/${mangaId}/${data?.attributes?.fileName}`}
            alt="image"
            width={1000}
            height={1000}
            className="h-[450px] w-auto shrink-0 rounded-lg"
          />
        ))}
    </div>
  )
}
