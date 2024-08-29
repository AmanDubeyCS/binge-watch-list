"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { animeFetch } from "@/quries/jikan/animefetch"

interface ImageURLs {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface Images {
  jpg: ImageURLs
  webp: ImageURLs
}

interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
}

interface Title {
  type: string
  title: string
}

interface AiredProp {
  day: number
  month: number
  year: number
}

interface Aired {
  from: string
  to: string
  prop: {
    from: AiredProp
    to: AiredProp
  }
  string: string
}

interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

interface AnimeData {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: {
    day: string
    time: string
    timezone: string
    string: string
  }
  producers: Producer[]
  licensors: Producer[]
  studios: Producer[]
  genres: Genre[]
  explicit_genres: Genre[]
  themes: Genre[]
  demographics: Genre[]
}

interface PaginationItems {
  count: number
  total: number
  per_page: number
}

interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  items: PaginationItems
}

interface AnimeResponse {
  data: AnimeData[]
  pagination: Pagination
}

export function AnimeList() {
  const router = useRouter()
  const [animeData, setAnimeData] = useState<AnimeData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AnimeResponse | null = await animeFetch({
          limit: 50,
          offset: 0,
          title: "",
        })
        if (response && response.data) {
          setAnimeData(response.data)
        } else {
          console.log("error fetching data")
        }
      } catch (error) {
        console.log("error fetching data", error)
      }
    }
    fetchData()
  })

  const handleClick = (animeID: any) => {
    router.push(`anime/${animeID}`)
  }
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {animeData &&
        animeData.map((anime) => (
          <div
            key={anime.mal_id}
            className="w-[250px]"
            onClick={() => handleClick(anime.mal_id)}
          >
            <Image
              src={anime.images.webp.image_url}
              alt="image"
              width={256}
              height={200}
              className="aspect-[5/7] h-auto w-[256px]"
            />
            <p className="line-clamp-2 text-wrap">{anime.title_english}</p>
          </div>
        ))}
    </div>
  )
}
