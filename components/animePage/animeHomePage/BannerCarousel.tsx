import React from "react"
import { Crouselcard } from "./Crouselcard"
import { AnimeData } from "@/types/anime/animeTypes"

export function BannerCarousel({ anime }: { anime: AnimeData[] }) {
  const uniqueData = anime.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.mal_id === item.mal_id)
  )
  // console.log(anime)
  return (
    <div className="hide-scrollbar flex gap-5 overflow-x-scroll">
      {uniqueData.map((anime, index: number) => (
        <Crouselcard
          key={anime.mal_id}
          animeID={anime.mal_id}
          index={index}
          title={anime.title_english}
          type={anime.type}
          year={anime.aired.from}
          synopsis={anime.synopsis}
          duration={anime.duration}
          image={anime.images.jpg.large_image_url}
        />
      ))}
    </div>
  )
}
