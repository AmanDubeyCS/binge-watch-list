import { AnimeData } from '@/types/anime/animeTypes'
import React from 'react'
import Animecard from './AnimeCard'

export function UpcomingAnime({ upcomingAnime }: {upcomingAnime: AnimeData[]}) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Upcoming Anime
      </h2>
      <div className="w-full whitespace-nowrap overflow-x-scroll hide-scrollbar">
        <div className="flex w-max space-x-4 py-3 pr-5">
          {upcomingAnime.map((anime) => (
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
              publication={anime.demographics[0]?.name}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
