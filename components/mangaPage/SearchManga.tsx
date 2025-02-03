import React from "react"
import { useSearchParams } from "next/navigation"

import { MangaItem } from "@/types/manga/mangaTypes"
import Card from "../common/Card"
import { bookStatuses } from "../common/ListContent"
import { useDebounce } from "@/util/debouncing"
import { useSearchData } from "@/queries/search"
import { LoadingCard } from "../LoadingCard"
import { NoDataFound } from "../NoDataFound"

export default function SearchManga() {
  const searchParams = useSearchParams()

  const debouncedQuery = useDebounce(searchParams.get("q") || "")

  const {
    data: mangaData,
    isLoading,
    error,
  } = useSearchData("manga", debouncedQuery)

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
        {!isLoading && mangaData && mangaData.length != 0 ? (
          <div className="grid grid-cols-2 gap-3 p-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {mangaData.map((manga: MangaItem) => {
              const image = manga.relationships.filter(
                (data) => data.type === "cover_art"
              )
              return (
                <Card
                  key={manga.id}
                  id={manga.id}
                  name={
                    manga.attributes?.title.en ||
                    manga.attributes?.title.ja ||
                    manga.attributes?.title["ja-ro"]
                  }
                  coverImage={`/api/mangaImage/${manga.id}/${image[0].attributes.fileName}`}
                  tag={manga.attributes.status}
                  voteAverage={manga.rating.rating.average}
                  voteCount={0}
                  genre={manga.attributes.tags
                    .filter((item) => item.attributes.group === "genre")
                    .map((item) => item.attributes.name.en)}
                  numbers={manga.rating.follows}
                  mediaType="manga"
                  status={bookStatuses}
                />
              )
            })}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  )
}
