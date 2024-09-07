import React from "react"
import Image from "next/image"
import { useAnimeCharacters } from "@/quries/jikan/animefetch"


export function CharacterDetails({animeID}: {animeID: number}) {
  
  const { data, error, isLoading } = useAnimeCharacters(animeID)
  console.log(data)
  return (
    <div className="flex flex-wrap gap-2">
      {!isLoading &&
        data &&
        data.map((character: any) => (
          <div key={character.character.mal_id} className="flex gap-1">
            <Image
              src={character.character.images?.webp.image_url}
              alt="image"
              width={100}
              height={100}
              className="aspect-[5/7] h-auto w-[50px]"
            />
            <div className="flex w-[150px] flex-col">
              <p>{character.character.name}</p>
              <p>{character.favorites}</p>
              <p>{character.role}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
