import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAnimeSerch } from "@/queries/jikan/animefetch"
import Card from "../common/Card"
import { AnimeData } from "@/types/anime/animeTypes"
import { tvStatuses } from "../common/ListContent"

export default function SearchAnime() {
  const searchParams = useSearchParams()
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParams.get("q") || "")
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchParams])

  const { data, error, isLoading } = useAnimeSerch(debouncedSearch)

  const uniqueData = data?.filter(
    (item: any, index: number, self: any[]) =>
      index === self.findIndex((t: {mal_id: number}) => t.mal_id === item.mal_id)
  )

  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div className="mx-auto flex max-w-[1600px] justify-center gap-2">
        {!isLoading && uniqueData && (
          <div
            style={{
              width: `${Math.round((uniqueData?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {uniqueData.map((anime: AnimeData) => (
              <Card
                key={anime.mal_id}
                id={anime.mal_id}
                name={anime.title_english || anime.title}
                coverImage={anime.images.webp.image_url}
                tag={anime.type}
                voteAverage={anime.score}
                voteCount={anime.scored_by}
                genre={anime.genres.map((genres) => genres.name)}
                numbers={anime.rank}
                mediaType="anime"
                status={tvStatuses}
                statusData={[]}
                episodes={anime.episodes}
                showStatus={anime.status}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
