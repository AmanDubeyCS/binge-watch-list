import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useMangaFetch } from "@/queries/mangaDex/mangaFetch"

import { MangaItem } from "@/types/manga/mangaTypes"
import Card from "../common/Card"
import { bookStatuses } from "../common/ListContent"
import { DataStore, useDataStore } from "@/store/allDataStore"

export default function SearchManga() {
  const searchParams = useSearchParams()
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const { data } = useDataStore() as DataStore

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParams.get("q") || "")
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchParams])

  const {
    data: mangaData,
    error,
    isLoading,
  } = useMangaFetch({
    limit: 16,
    offset: 0,
    title: debouncedSearch,
  })

  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div className="mx-auto flex max-w-[1600px] justify-center gap-2">
        {!isLoading && mangaData && (
          <div className="grid grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                  coverImage={`https://uploads.mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}.256.jpg`}
                  tag={manga.attributes.status}
                  voteAverage={manga.rating.rating.average}
                  voteCount={0}
                  genre={manga.attributes.tags
                    .filter((item) => item.attributes.group === "genre")
                    .map((item) => item.attributes.name.en)}
                  numbers={manga.rating.follows}
                  mediaType="manga"
                  status={bookStatuses}
                  statusData={data}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
