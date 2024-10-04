import { useAnimeRecommendations } from "@/quries/jikan/animefetch"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface AnimeImage {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface AnimeEntry {
  mal_id: number
  url: string
  title: string
  images: {
    jpg: AnimeImage
    webp: AnimeImage
  }
}

interface AnimeRecommendation {
  entry: AnimeEntry
  url: string
  votes: number
}

export function Recommendations({ animeID }: { animeID: number }) {
  const router = useRouter()
  const { data } = useAnimeRecommendations(animeID)

  if (data && data.length === 0) {
    return (
      <div className="flex w-full justify-center text-[24px] text-black">
        N/A
      </div>
    )
  }

  const handleClick = (animeID: any) => {
    router.push(`${animeID}`)
  }
  return (
    <div className="flex flex-wrap gap-4 text-black">
      {data &&
        data.map((anime: AnimeRecommendation, index: number) => (
          <div
            key={index}
            onClick={() => handleClick(anime.entry.mal_id)}
            className="w-56 cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="relative h-64">
              <Image
                className="size-full object-cover"
                src={anime.entry.images.jpg.image_url}
                alt="Character Image"
                width={150}
                height={200}
              />
            </div>
            <div className="p-4">
              <h2 className="truncate text-lg font-bold text-indigo-700">
                {anime.entry.title}
              </h2>
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                {anime.votes} votes by users
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
