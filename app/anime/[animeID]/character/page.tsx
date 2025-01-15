import { config } from "@/apiConfig"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import Image from "next/image"
import React from "react"

interface CharacterDetailsProps {
  character: {
    mal_id: number
    url: string
    images: {
      jpg: {
        image_url: string
      }
      webp: {
        image_url: string
        small_image_url: string
      }
    }
    name: string
  }
  role: string
  favorites: number
  voice_actors: {
    person: {
      mal_id: number
      url: string
      images: {
        jpg: {
          image_url: string
        }
      }
      name: string
    }
    language: string
  }[]
}

export default async function page({
  params,
}: {
  params: { animeID: number }
}) {
  const animeID = params.animeID
  const animeData = await fetchFromJikan(config.getCharactersDetail(animeID), 0)
  const characters = await animeData.data

  // console.log(characters[0].voice_actors[0].person.name)
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-2 px-2 py-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {characters &&
        characters.map((character: CharacterDetailsProps) => (
          <div
            key={character.character.mal_id}
            className="size-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="relative h-64">
              <Image
                className="size-full object-cover"
                src={character.character.images?.webp.image_url}
                alt="Character Image"
                width={150}
                height={200}
              />
              {/* <button className="absolute right-2 top-2 rounded-full bg-white p-1 text-red-500 transition-colors hover:text-red-600">
                <Heart className="size-5" />
              </button> */}
            </div>
            <div className="p-4">
              <h2 className="truncate text-lg font-bold text-indigo-700">
                {character.character.name}
                <span className="mb-2 ml-1 text-sm text-gray-500">
                  ({character.role})
                </span>
              </h2>
              {/* <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                  {character.favorites} votes
                </span>
              </div> */}
            </div>
          </div>
        ))}
    </div>
  )
}
