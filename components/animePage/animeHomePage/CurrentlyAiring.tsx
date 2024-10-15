import { Tv } from "lucide-react"
import React from "react"
import Animecard from "./AnimeCard"
import { AnimeData } from "@/types/anime/animeTypes"

export function CurrentlyAiring({
  currentlyAiring,
}: {
  currentlyAiring: AnimeData[]
}) {
  return (
    <section>
      <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
        <Tv className="mr-2" />
        Currently Airing
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        <div className="flex w-max space-x-4 py-3 pr-5">
          {currentlyAiring.map((anime) => (
            <Animecard
              key={anime.mal_id}
              animeID={anime.mal_id}
              title_en={anime.title_english || anime.title}
              image={anime.images.webp.image_url}
              rating={anime.score}
              genres={anime.genres}
              ranking={anime.rank}
              scoredBy={anime.scored_by}
              status={anime.status}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
