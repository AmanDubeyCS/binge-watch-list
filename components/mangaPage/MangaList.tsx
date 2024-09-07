"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useMangaFetch } from "@/quries/mangaDex/mangaFetch"

import { MangaItem } from "@/types/manga/mangaTypes"

import Card from "../Card"
import SearchManga from "./SearchManga"

export function MangaList() {
  const router = useRouter()

  const { data, error, isLoading } = useMangaFetch({
    limit: 27,
    offset: 0,
    title: "",
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleClick = (mangaID: any) => {
    router.push(`manga/${mangaID}`)
  }

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <SearchManga />
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((manga: MangaItem) => {
          const image = manga.relationships.filter(
            (data) => data.type === "cover_art"
          )
          return (
            <div onClick={() => handleClick(manga.id)} key={manga.id}>
              <Card
                image={`https://mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}`}
                title_en={manga.attributes?.title.en}
                title={manga.attributes?.title.ja}
                publication={manga.attributes.status}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
