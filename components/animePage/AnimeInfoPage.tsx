import React from "react"
import Image from "next/image"
import useAnimeStore from "@/store/animeIdStore"
import { EpisodesDetails } from "./EpisodesDetails"
import { CharacterDetails } from "./CharacterDetails"

export function AnimeInfoPage({ animdInfo }: any) {

  const animeID = useAnimeStore((state) => state.animeID)
  return (
    <div>
      {animdInfo.images?.webp.image_url && (
        <Image
          src={animdInfo.images?.webp.image_url}
          alt="image"
          width={300}
          height={300}
          className="aspect-[5/7] h-auto w-[256px]"
          priority
        />
      )}
      <p>{animdInfo.title_english}</p>
      {animeID && <EpisodesDetails animeID={animeID}/>}
      {animeID && <CharacterDetails animeID={animeID}/>}
    </div>
  )
}
