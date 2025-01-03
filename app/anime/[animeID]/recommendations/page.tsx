import { config } from "@/apiConfig"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import Image from "next/image"
import Link from "next/link"
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

export default async function page({
  params,
}: {
  params: { animeID: number }
}) {
  const animeID = params.animeID
  const animeData = await fetchFromJikan(
    config.getAnimerecommendations(animeID),
    0
  )
  const recommendation = await animeData.data

  return (
    <div className="flex flex-wrap gap-4 text-black">
      {recommendation &&
        recommendation.map((anime: AnimeRecommendation) => (
          <Link
            href={`/anime/${anime.entry.mal_id}`}
            key={anime.entry.mal_id}
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
              {/* <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                {anime.votes} votes by users
              </span> */}
            </div>
          </Link>
        ))}
    </div>
  )
}
