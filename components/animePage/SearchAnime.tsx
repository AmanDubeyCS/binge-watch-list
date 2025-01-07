import React from "react"
import { useSearchParams } from "next/navigation"
import Card from "../common/Card"
import { AnimeData } from "@/types/anime/animeTypes"
import { tvStatuses } from "../common/ListContent"
import { useDebounce } from "@/util/debouncing"
import { useSearchData } from "@/queries/search"
import { LoadingCard } from "../LoadingCard"

export default function SearchAnime() {
  const searchParams = useSearchParams()

  const debouncedQuery = useDebounce(searchParams.get("q") || "")

  const {
    data: animeData,
    isLoading,
    error,
  } = useSearchData("anime", debouncedQuery)

  const uniqueData = animeData?.data?.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex((t: { mal_id: number }) => t.mal_id === item.mal_id)
  )

  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      {isLoading && (
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-4">
          {Array.from({ length: 16 }, (_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}
      <div className="mx-auto flex max-w-[1600px] justify-center gap-2">
        {uniqueData && (
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
