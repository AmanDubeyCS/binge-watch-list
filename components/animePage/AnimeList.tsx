"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAnimeFetch } from "@/quries/jikan/animefetch"

import { AnimeData } from "@/types/anime/animeTypes"

import Card from "../Card"
import SearchAnime from "./SearchAnime"

export function AnimeList() {
  const router = useRouter()
  const { data } = useAnimeFetch()

  const handleClick = (animeID: any) => {
    router.push(`anime/${animeID}`)
  }
  console.log(data)
  return (
    <div className="flex flex-col flex-wrap gap-2">
      <SearchAnime />
      <div className="flex flex-wrap justify-center gap-4">
        {data &&
          data.map((anime: AnimeData) => (
            <div key={anime.mal_id} onClick={() => handleClick(anime.mal_id)}>
              <Card
                title_en={anime.title_english}
                image={anime.images.webp.image_url}
                rating={anime.score * 10}
                publication={anime.demographics[0]?.name}
              />
              {/* <Image
                src={anime.images.webp.image_url}
                alt="image"
                width={256}
                height={200}
                className="aspect-[5/7] h-auto w-[256px]"
              />
              <p className="line-clamp-2 text-wrap">{anime.title_english}</p> */}
            </div>
          ))}
      </div>
    </div>
  )
}
