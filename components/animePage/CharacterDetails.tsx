import React from "react"
import Image from "next/image"
import { useAnimeCharacters } from "@/quries/jikan/animefetch"
import { Heart } from "lucide-react"

interface CharacterDetails {
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

export function CharacterDetails({ animeID }: { animeID: number }) {
  const { data, isLoading } = useAnimeCharacters(animeID)
  if(!isLoading && !data) {
   <div className="flex w-full justify-center text-[24px]">N/A</div>
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {!isLoading &&
        data &&
        data.map((character: CharacterDetails) => (
          <div
            key={character.character.mal_id}
            className="w-56 overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="relative h-64">
              <Image
                className="size-full object-cover"
                src={character.character.images?.webp.image_url}
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
                {character.character.name}
              </h2>
              <p className="mb-2 text-sm text-gray-500">{character.role}</p>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                  {character.favorites} votes
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
