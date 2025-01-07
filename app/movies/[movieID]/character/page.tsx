import { configTMDB } from "@/apiConfig"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface Actor {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  const data = await fetchFromTMDB(configTMDB.getSingleMovieCast(movieID))

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-2 px-2 py-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data &&
        data.cast.map((character: Actor) => (
          <Link
            key={character.id}
            href={`/person/${character.id}`}
            className="size-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="relative h-64">
              <Image
                className="size-full object-cover"
                src={`https://image.tmdb.org/t/p/w300/${character.profile_path}`}
                alt="Character Image"
                width={150}
                height={200}
              />
              <button className="absolute right-2 top-2 rounded-full bg-white p-1 text-red-500 transition-colors hover:text-red-600">
                <Heart className="size-5" />
              </button>
            </div>
            <div className="p-4">
              <h2 className="truncate text-lg font-bold text-indigo-700">
                {character.name}
              </h2>
              <p className="mb-2 text-sm text-gray-500">
                <span>As {character.character}</span>
              </p>
              {/* <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                  {character.popularity} popularity
                </span>
              </div> */}
            </div>
          </Link>
        ))}
    </div>
  )
}
